import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('caju.db');

const initDB = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS benefits (slug TEXT PRIMARY KEY NOT NULL, name TEXT NOT NULL, icon TEXT NOT NULL, balance REAL NOT NULL, bgColor TEXT NOT NULL);'
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title TEXT NOT NULL, value REAL NOT NULL, type TEXT NOT NULL, benefitSlug TEXT NOT NULL, date TEXT NOT NULL, FOREIGN KEY (benefitSlug) REFERENCES benefits (slug));'
    );
  }, (err) => console.log('Error initializing database', err));
};

export const database = {
  initDB,
};
