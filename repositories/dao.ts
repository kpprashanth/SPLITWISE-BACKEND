import * as sqlite from "sqlite3";
const sqlite3 = sqlite.verbose();
import { v4 as uuidv4 } from "uuid";
const db = new sqlite3.Database("./db/sqlite.db");

export default class {
  static setupDbForDev() {
    db.serialize(function () {
      //   Drop Tables:
      const dropUsersTable = "DROP TABLE IF EXISTS users";
      db.run(dropUsersTable);
      const dropExpenseTable = "DROP TABLE IF EXISTS expense";
      db.run(dropExpenseTable);
      const dropGroupTable = "DROP TABLE IF EXISTS groups";
      db.run(dropGroupTable);
      const dropUserGroupTable = "DROP TABLE IF EXISTS userGroup";
      db.run(dropUserGroupTable);
      const dropTransactionTable = "DROP TABLE IF EXISTS expenseTransaction";
      db.run(dropTransactionTable);

      // Create Tables:
      const createUsersTable =
        "CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY NOT NULL,email TEXT, fullName TEXT)";
      db.run(createUsersTable);
      const createGroupTable =
        "CREATE TABLE IF NOT EXISTS groups (id TEXT PRIMARY KEY NOT NULL,name TEXT, description TEXT)";
      db.run(createGroupTable);
      const createExpenseTable =
        "CREATE TABLE IF NOT EXISTS expense (id TEXT PRIMARY KEY NOT NULL,name TEXT, description TEXT,createdBy TEXT NOT NULL,groupId TEXT NOT NULL,amount REAL NOT NULL, FOREIGN KEY(createdBy) REFERENCES users(id), FOREIGN KEY(groupId) REFERENCES groups(id))";
      db.run(createExpenseTable);
      const createUserGroupTable =
        "CREATE TABLE IF NOT EXISTS userGroup (id TEXT PRIMARY KEY NOT NULL, userId TEXT NOT NULL,groupId TEXT NOT NULL, addedBy TEXT NOT NULL,FOREIGN KEY(addedBy) REFERENCES users(id), FOREIGN KEY(userId) REFERENCES users(id), FOREIGN KEY(groupId) REFERENCES groups(id))";
      db.run(createUserGroupTable);
      const createTransactionTable =
        "CREATE TABLE IF NOT EXISTS expenseTransaction (id TEXT PRIMARY KEY NOT NULL, source TEXT NOT NULL, destination TEXT NOT NULL,expenseId TEXT NOT NULL,amount REAL NOT NULL,FOREIGN KEY(source) REFERENCES users(id), FOREIGN KEY(destination) REFERENCES users(id), FOREIGN KEY(expenseId) REFERENCES expense(id))";
      db.run(createTransactionTable);

      const insertUsers = `INSERT INTO users (id, email, fullName) VALUES ('${uuidv4()}','test@gmail.com', 'Test User');`;
      const insertGroups = `INSERT INTO groups (id, name, description) VALUES ('${uuidv4()}', 'Test Group', 'Test Group Description');`;
      db.run(insertUsers);
      db.run(insertGroups);
    });
  }

  static all(stmt, params) {
    return new Promise((res, rej) => {
      db.all(stmt, params, (error, result) => {
        if (error) {
          return rej(error.message);
        }
        return res(result);
      });
    });
  }
  static get(stmt, params) {
    return new Promise((res, rej) => {
      db.get(stmt, params, (error, result) => {
        if (error) {
          return rej(error.message);
        }
        return res(result);
      });
    });
  }

  static run(stmt, params) {
    return new Promise((res, rej) => {
      db.run(stmt, params, (error, result) => {
        if (error) {
          return rej(error.message);
        }
        return res(result);
      });
    });
  }
}
