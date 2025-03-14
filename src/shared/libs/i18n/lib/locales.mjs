import { writeFileSync } from "node:fs";
import path from "node:path";

import fetch from "node-fetch";

const KEY_MARKER = "key";
const DEPTH_SEPARATOR = "-";
const SPREAD_SHEET_ID = "1HpAUx_IalOHMoByp4TLZnsDNoWTDC7hjQLb3f9vAgfw";

const commaSplitterRegex = /(['"])((?:\\.|(?:(?!\1)[^\\]))*)\1/g;
const removeSideCommaRegex = /^"|"$/g;

const getKeysAndRows = (text) => {
  const [head, ...body] = text.split("\n");
  const keys = head.match(commaSplitterRegex)?.map((key) => key?.replace(removeSideCommaRegex, "")) || [];
  const rows = body.map((row) => row.match(commaSplitterRegex));

  return {
    keys: keys.map((ele) => {
      if (ele !== KEY_MARKER) return ele.slice(0, 2);

      return ele;
    }),
    rows,
    length: keys.length,
  };
};

const mapKeysAndValues = ({ keys, rows, length }) => {
  const locales = keys.filter((key) => key && !key.includes(KEY_MARKER));
  const fileMap = locales.reduce((obj, key) => ({ ...obj, [key]: {} }), {});

  console.log(rows, " 123");

  for (const row of rows) {
    let keyName = "";

    for (let i = 0; i < length; i += 1) {
      const key = keys[i];

      if (!row[i] || !key) {
        continue;
      }

      const value = row[i].replace(removeSideCommaRegex, "");

      if (key.includes(KEY_MARKER)) {
        keyName = value;
      } else {
        let targetDepth = fileMap;
        const indexOfFirstSeparator = keyName.indexOf(DEPTH_SEPARATOR);

        const splittedKeys = [
          key,
          ...[keyName.slice(0, indexOfFirstSeparator), keyName.slice(indexOfFirstSeparator + 1)],
        ];
        const targetKeyName = splittedKeys.pop() || "";

        for (const currentKey of splittedKeys) {
          if (!targetDepth[currentKey]) targetDepth[currentKey] = {};
          targetDepth = targetDepth[currentKey];
        }
        targetDepth[targetKeyName] = value;
      }
    }
  }

  return fileMap;
};

export const generateLocaleFiles = async (saveLocation) => {
  const response = await fetch(`https://docs.google.com/spreadsheets/d/${SPREAD_SHEET_ID}/gviz/tq?tqx=out:csv`);
  const csvText = await response.text();

  const parsedValues = getKeysAndRows(csvText);
  const parsedJson = mapKeysAndValues(parsedValues);

  const fileDir = path.resolve(saveLocation);

  for (const [locale, json] of Object.entries(parsedJson)) {
    const fileName = `${locale}.json`;
    writeFileSync(path.resolve(fileDir, fileName), JSON.stringify(json, null, 2), "utf8");

    console.info(`✅   type file "${fileName}" created in ${fileDir}`);
  }
};

generateLocaleFiles("./src/shared/libs/i18n/lib/locales");
