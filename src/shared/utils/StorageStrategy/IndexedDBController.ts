export interface Data {
  id: string;
  [key: string]: any; // Allows any other property with a key of type string and value of any type
}

export default class IndexedDBController<T = any> {
  private dbName: string;
  private version: number;
  private db: IDBDatabase | null;
  private indexedDBKey: string;

  constructor(dbName = "dbName") {
    this.dbName = dbName;
    this.version = 1;
    this.db = null;
    this.indexedDBKey = "sysmasterDB";
  }

  open = async () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;

        if (!db.objectStoreNames.contains(this.indexedDBKey)) {
          db.createObjectStore(this.indexedDBKey, { keyPath: "id" });
        }
      };

      request.onsuccess = (event: Event) => {
        this.db = (event.target as IDBOpenDBRequest).result;

        resolve(1);
      };

      request.onerror = (event: Event) => {
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  };

  put = async (data: Data) => {
    if (!this.db) {
      await this.open();
    }

    return new Promise((resolve, reject) => {
      if (!this.db) return;

      const transaction = this.db!.transaction([this.indexedDBKey], "readwrite");
      const store = transaction.objectStore(this.indexedDBKey);
      const request = store.put(data);

      request.onsuccess = () => {
        resolve(1);
      };
      request.onerror = (event: Event) => reject((event.target as IDBRequest).error);
    });
  };

  read = async ({ id }: { id: string }): Promise<{ data: T } | undefined> => {
    if (!this.db) {
      await this.open();
    }

    return new Promise((resolve, reject) => {
      if (!this.db) return;

      const transaction = this.db!.transaction([this.indexedDBKey]);
      const store = transaction.objectStore(this.indexedDBKey);
      const request = store.get(id);

      request.onsuccess = async () => {
        const data = request.result;
        resolve(data);
      };
      request.onerror = (event: Event) => reject((event.target as IDBRequest).error);
    });
  };

  delete = async ({ id }: { id: string }) => {
    if (!this.db) {
      await this.open();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.indexedDBKey], "readwrite");
      const store = transaction.objectStore(this.indexedDBKey);

      const request = store.delete(id);

      request.onsuccess = () => resolve(1);
      request.onerror = (event: Event) => reject((event.target as IDBRequest).error);
    });
  };

  deleteDatabase = async () => {
    return new Promise((resolve, reject) => {
      if (this.db) {
        this.db.close(); // 데이터베이스 연결을 닫습니다.
        this.db = null;
      }

      const request = indexedDB.deleteDatabase(this.dbName);

      request.onsuccess = () => {
        console.log(`${this.dbName} indexed db batch remove success`);
        resolve(1);
      };

      request.onerror = (event: Event) => {
        console.error(` indexed db batch remove error`, (event.target as IDBRequest).error);
        reject((event.target as IDBRequest).error);
      };

      request.onblocked = () => {
        console.warn(`indexed db batch remove block`);
      };
    });
  };
}
