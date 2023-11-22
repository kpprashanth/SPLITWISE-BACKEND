import repo from "../repositories/userGroup.repository";
import { Request, Response } from "express";
import UserGroup from "../models/userGroup";

export default class {
  static async getAllUserGroup(req: Request, res: Response, next: Function) {
    let userGroups = await repo.getAllUserGroup();
    return res.send({ userGroups });
  }

  static async getUserGroupById(req: Request, res: Response, next: Function) {
    let userGroup = await repo.getUserGroupById(req.params.id);
    if (!userGroup) {
      return res
        .status(404)
        .send("userGroup not found with id " + req.params.id);
    }
    return res.send({ userGroup });
  }

  static async createUserGroup(req: Request, res: Response, next: Function) {
    if (!req.body.userId || !req.body.groupId || !req.body.addedBy) {
      const err: Error = new Error(
        "UserGroup userId, groupId and addedBy are required."
      );
      return next(err);
    }
    const { userId, groupId, addedBy } = req.body;
    const newUserGroup = new UserGroup(userId, groupId, addedBy);
    const success = await repo.createUserGroup(newUserGroup);
    return res.send({ success, userGroup: newUserGroup });
  }

  static async deleteUserGroup(req: Request, res: Response, next: Function) {
    if (!req.params.id) {
      const err: Error = new Error("UserGroup id is required.");
      return next(err);
    }
    let deleted = await repo.deleteUserGroup(req.params.id);
    return res.send({ success: deleted });
  }
}
