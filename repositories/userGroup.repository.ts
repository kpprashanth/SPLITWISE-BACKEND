import UserGroup from "../models/userGroup";
import dao from "./dao";

export default class {
  static async getAllUserGroup(): Promise<UserGroup[]> {
    const userGroups = await dao.all("SELECT * FROM userGroup", []);
    return <UserGroup[]>userGroups;
  }

  static async getAllUserGroupByUserId(id: string): Promise<UserGroup[]> {
    const userGroups = await dao.all(
      "SELECT * FROM userGroup WHERE userId = ?",
      [id]
    );
    return <UserGroup[]>userGroups;
  }
  static async getAllUserGroupByGroupId(id: string): Promise<UserGroup[]> {
    const userGroups = await dao.all(
      "SELECT * FROM userGroup WHERE groupId = ?",
      [id]
    );
    return <UserGroup[]>userGroups;
  }

  static async getUserGroupById(id: string): Promise<UserGroup> {
    const userGroup = await dao.get("SELECT * FROM userGroup WHERE id = ?", [
      id,
    ]);
    return <UserGroup>userGroup;
  }

  static async createUserGroup(userGroup: UserGroup): Promise<boolean> {
    const insertUserGroups = `INSERT INTO userGroup (id, userId, groupId, addedBy) VALUES (?,?,?,?);`;
    try {
      const { id, userId, groupId, addedBy } = userGroup;
      await dao.run(insertUserGroups, [id, userId, groupId, addedBy]);
      return true;
    } catch (ex) {
      console.error(ex);
      return false;
    }
  }

  static async deleteUserGroup(id: string) {
    const stmt = `DELETE FROM userGroup WHERE id = ?;`;
    try {
      await dao.run(stmt, [id]);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
