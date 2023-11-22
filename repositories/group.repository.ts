import dao from "./dao";
import Group from "../models/group";

export default class {
  static async getAllGroups(): Promise<Group[]> {
    const items = await dao.all("SELECT * FROM groups", []);
    return <Group[]>items;
  }

  static async getGroupByName(name: string): Promise<Group> {
    const group = await dao.get("SELECT * FROM groups WHERE name =?", [name]);
    return <Group>group;
  }

  static async getGroupById(id: string): Promise<Group> {
    const group = await dao.get("SELECT * FROM groups WHERE id = ?", [id]);
    return <Group>group;
  }

  static async createGroup(group: Group): Promise<boolean> {
    const insertGroups = `INSERT INTO groups (id, name, description) VALUES (?,?,?);`;
    try {
      await dao.run(insertGroups, [group.id, group.name, group.description]);
      return true;
    } catch (ex) {
      console.error(ex);
      return false;
    }
  }
  static async updateGroup(group: Group): Promise<boolean> {
    const stmt = `UPDATE groups SET name = ?, description= ? WHERE id = ?;`;
    try {
      await dao.run(stmt, [group.name, group.description, group.id]);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  static async deleteGroup(id: string) {
    const stmt = `DELETE FROM groups WHERE id = ?;`;
    try {
      await dao.run(stmt, [id]);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
