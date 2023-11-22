import dao from "./dao";
import User from "../models/user";

export default class {
  static async getAllUsers(): Promise<User[]> {
    const users = await dao.all("SELECT * FROM users", []);
    return <User[]>users;
  }

  static async getUserByEmail(email: string): Promise<User> {
    const user = await dao.get("SELECT * FROM users WHERE email =?", [email]);
    return <User>user;
  }

  static async getUserById(id: string): Promise<User> {
    const user = await dao.get("SELECT * FROM users WHERE id = ?", [id]);
    return <User>user;
  }

  static async updateUser(user: User): Promise<boolean> {
    const stmt = `UPDATE users SET email = ?, fullName= ? WHERE id = ?;`;
    try {
      await dao.run(stmt, [user.email, user.fullName, user.id]);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  static async updateBalance(user: User): Promise<boolean> {
    const stmt = `UPDATE users SET balance = ? WHERE id = ?;`;
    try {
      await dao.run(stmt, [user.balance, user.id]);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  static async createUser(user: User): Promise<boolean> {
    const insertUsers = `INSERT INTO users (id, email, fullName) VALUES (?,?,?);`;
    try {
      await dao.run(insertUsers, [user.id, user.email, user.fullName]);
      return true;
    } catch (ex) {
      console.error(ex);
      return false;
    }
  }

  static async deleteUser(userId: string) {
    const stmt = `DELETE FROM users WHERE id = ?;`;
    try {
      await dao.run(stmt, [userId]);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
