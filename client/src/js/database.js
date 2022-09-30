import { openDB } from 'idb';
import 'regenerator-runtime/runtime';

export const initdb = async () =>
    // creating (init) a new database named 'contact_db' which will be using version 1 of the database

openDB('contact_db', 1, {
  // if db is not already initialized, add our database schema
  upgrade(db) {
    if (db.objectStoreNames.contains('contacts')) {
      console.log('contacts store already exists');
      return;
    }
    // Create a new object store for the data and give it a key of 'id' which will increment automatically
    db.createObjectStore('contacts', { keyPath: 'id', autoIncrement: true });
    console.log('contacts store created');
  }
});

// Export a function we will use to GET to the database.
export const getDb = async () => {
  console.log('GET from the database');
  // create a connection to the IndexedDB db and the version we want to use
  const contactDb = await openDB('contact_db', 1);
  // create a new transaction and specify where to 'store' and what 'data privileges' are needed
  const tx = contactDb.transaction('contacts', 'readonly');
  // open where the object is stored
  const store = tx.objectStore('contacts');
  // use the .getAll() method to get all data in the database
  const request = store.getAll();
  // get confirmation of the request
  const result = await request;
  console.log('result.value', result);
  return result;
};

// Export a function we will use to POST to the database.
export const postDb = async (name, email, phone, profile)  => {
  console.log('Post to the database');
  // create a connection the the db and the version we want to use
  const contactDb = await openDB('contact_db', 1);
  // create a new transaction and specify where to 'store' and what 'data privileges' are needed
  const tx = contactDb.transaction('contacts', 'readwrite');
  // open where the object is stored
  const store = tx.objectStore('contacts');
  // use the .add() method on tthe store to pass in content
  const request = store.add({ name: name, email: email, phone: phone, profile: profile});
  // get confirmation of request going through
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

export const deleteDb = async (id) => {
  console.log('DELETE from the database', id);
  // create a connection the the db and the version we want to use
  const contactDb = await openDB('contact_db', 1);
  // create a new transaction and specify where to 'store' and what 'data privileges' are needed
  const tx = contactDb.transaction('contacts', 'readwrite');
  // open where the object is stored
  const store = tx.objectStore('contacts');
  // use the .delete() method on the delete method to delete all
  const request = store.delete(id);
  // get confirmation of request going through
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

export const editDb = async (id, name, email, phone, profile) => {
  console.log('PUT to the database');
  // create a connection the the db and the version we want to use
  const contactDb = await openDB('contact_db', 1);
  // create a new transaction and specify where to 'store' and what 'data privileges' are needed
  const tx = contactDb.transaction('contacts', 'readwrite');
  // open where the object is stored
  const store = tx.objectStore('contacts');
  // use the .put() method on tthe store to pass in content
  const request = store.put({ id: id, name: name, email: email, phone: phone, profile: profile });
  // get confirmation of request going through
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};