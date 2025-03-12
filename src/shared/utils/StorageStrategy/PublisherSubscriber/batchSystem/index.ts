import { cloneDeep, debounce, isNil } from "lodash-es";

import IndexedDBController from "../../IndexedDBController";
import { PubSubManager } from "../PubSubManager";

const BATCH_USER_THRESHOLD = 50;

const AUTH_STORAGE_KEY_SEPARATOR = "_-";

const AUTH_STORAGE_INIT = `${AUTH_STORAGE_KEY_SEPARATOR}PUT`;

const AUTH_STORAGE_PUT_BY_LOCAL_STORAGE = `${AUTH_STORAGE_KEY_SEPARATOR}PUTBYLOCAL`;

const AUTH_STORAGE_PUT_BY_INDEX_DB = `${AUTH_STORAGE_KEY_SEPARATOR}PUTBYINDEX`;

/**
 * Mutex to prevent concurrent access during critical operations.
 * Ensures that only one operation is performed at a time.
 */
let mutex = false;

const INTERNAL_CLEAN_BY_ID = `${AUTH_STORAGE_INIT}_CLEAN_BY_ID`;

/**
 * IndexedDB controller instance for managing batch system records.
 * Uses "BATCH_SYSTEM" as the database name.
 */
const BatchSystem = new IndexedDBController<Record<string, number>>("BATCH_SYSTEM");

/**
 * IndexedDB controller instance for managing references to localStorage batches.
 * Uses "BATCH_SYSTEM_REFERENCE_LOCAL" as the database name.
 */
const LocalStorageBatchSystem = new IndexedDBController<Record<string, number>>("BATCH_SYSTEM_REFERENCE_LOCAL");

/**
 * IndexedDB controller instance for managing references to IndexedDB batches.
 * Uses "BATCH_SYSTEM_REFERENCE_INDEX" as the database name.
 */
const IndexedDbBatchSystem = new IndexedDBController("BATCH_SYSTEM_REFERENCE_INDEX");

let LocalStorageBatchJSON: { [key in string]: any } = {};
let IndexedDbBatchJSON: { [key in string]: any } = {};

/**
 * PubSubManager instance for managing publish-subscribe messaging between components.
 * Handles subscription and publication of various events.
 */
// export const storageLRUPubsubManager = new PubSubManager();
const storageLRUPubsubManager = new PubSubManager();

/**
 * Subscribes to the AUTH_STORAGE_INIT event to initialize and manage batch processing.
 * Updates the batch record with the current timestamp, removes outdated entries,
 * and schedules the cleanup of old batch data.
 *
 * @param {Object} param - The event payload.
 * @param {string} param.id - The unique identifier associated with the event.
 */
storageLRUPubsubManager.subscribe(AUTH_STORAGE_INIT, async ({ id }) => {
  LocalStorageBatchJSON = {};
  IndexedDbBatchJSON = {};

  const { data: originalData } = (await BatchSystem.read({ id: "record" })) ?? {
    id: "record",
    data: {} as Record<string, number>,
  };

  const batchContainer: string[] = [];

  // 최신 reference 추가
  const currentTime = Date.now();

  const threshold = currentTime - 90 * 24 * 60 * 60 * 1000; // 90일
  let data = cloneDeep(originalData);
  // data[id] = currentTime;

  data = Object.fromEntries(
    Object.entries(data)

       
      .filter(([key, timestamp]) => {
        return timestamp >= threshold;
      })
      .sort(([, timeA], [, timeB]) => timeB - timeA)
      .slice(0, BATCH_USER_THRESHOLD)
  );

  Object.keys(originalData).forEach((key) => {
    if (isNil(data[key])) {
      batchContainer.push(key);
    }
  });
  BatchSystem.put({ id: "record", data: { ...data } });

  for (const key of batchContainer) {
    storageLRUPubsubManager.publish({ type: INTERNAL_CLEAN_BY_ID, payload: { id: key } });

    // 100ms delay
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
});

const debouncedLocalStorageUpdate = debounce(async ({ id }: { id: string }) => {
  if (mutex) return;

  const { data } = ((await LocalStorageBatchSystem.read({ id })) as { data: any }) ?? { data: {} };

  LocalStorageBatchSystem.put({ id, data: { ...data, ...LocalStorageBatchJSON } });
}, 1000);

const debouncedIndexDbStorageUpdate = debounce(async ({ id }: { id: string }) => {
  if (mutex) return;

  const { data } = ((await IndexedDbBatchSystem.read({ id })) as { data: any }) ?? { data: {} };

  IndexedDbBatchSystem.put({ id, data: { ...data, ...IndexedDbBatchJSON } });
}, 1000);

/**
 * Subscribes to the AUTH_STORAGE_PUT_BY_INDEX_DB event to handle batch data insertion into IndexedDB.
 * Accumulates data and triggers debounced storage update.
 *
 * @param {Object} param - The event payload.
 * @param {string} param.id - The identifier for the batch.
 * @param {any} param.data - The data to be added to the batch.
 */
storageLRUPubsubManager.subscribe(AUTH_STORAGE_PUT_BY_INDEX_DB, async ({ id, data }) => {
  if (id) {
    IndexedDbBatchJSON[data] = data;

    debouncedIndexDbStorageUpdate({ id });
  }
});

storageLRUPubsubManager.subscribe(AUTH_STORAGE_PUT_BY_LOCAL_STORAGE, async ({ id, data }) => {
  if (id) {
    LocalStorageBatchJSON[data] = data;

    debouncedLocalStorageUpdate({ id });
  }
});

/**
 * Subscribes to the AUTH_STORAGE_PUT_BY_LOCAL_STORAGE event to handle batch data insertion into localStorage.
 * Accumulates data and triggers debounced storage update.
 *
 * @param {Object} param - The event payload.
 * @param {string} param.id - The identifier for the batch.
 * @param {any} param.data - The data to be added to the batch.
 */
storageLRUPubsubManager.subscribe(INTERNAL_CLEAN_BY_ID, async ({ id }) => {
  mutex = true;

  // const IndexedDBControllerByUser = new IndexedDBControllerByUserKey({ id, publish: false });
  // await IndexedDBControllerByUser.deleteDatabase();

  const localKeys = ((await LocalStorageBatchSystem.read({ id })) as { data: any }) ?? { data: {} };

  Object.keys(localKeys.data).forEach((key) => {
    localStorage.removeItem(key);
  });

  await LocalStorageBatchSystem.delete({ id });
  await IndexedDbBatchSystem.delete({ id });

  mutex = false;
});
