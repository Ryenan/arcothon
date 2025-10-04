import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const initDb = async () => {
   const db = await open({
       filename: './dbRemedios.db',
       driver: sqlite3.Database
   });

   return db;
}