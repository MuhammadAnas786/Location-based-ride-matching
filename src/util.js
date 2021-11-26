const asyncLock = require("async-lock");
const fs = require("fs");
const path = require("path");

let lock = new asyncLock();

const getFile = async (FILE) => {
  try {
    const records = require(`./${FILE}`);
    return records;
  } catch (err) {
    console.log(err);
    return null;
  }
};
const getFormattedFile = async (FILE) => {
  let records = await getFile();
  if (!records) return null;
  let ar = [];
  for (const property in records) {
    ar.push(records[property]);
  }
  return ar;
};
const Validate = async (property, data) => {
  if (!data[property]) return false;
  let formatttedRecord = await getFormattedFile();
  return formatttedRecord.filter(
    (obj) => obj[property] === data[property] && obj.id != data.id
  );
};
const FileLock = function (callback) {
  return new Promise((resolve, reject) => {
    lock.acquire("WriteToFile", callback(resolve, reject));
  });
};
const WriteToFile = async (data, FILE) => {
  return FileLock((resolve, reject) => {
    try {
      fs.writeFileSync(path.resolve(__dirname, FILE), JSON.stringify(data));
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  getFormattedFile,
  Validate,
  FileLock,
  WriteToFile,
  getFile,
};
