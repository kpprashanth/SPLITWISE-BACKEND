import repo from "../repositories/group.repository";
import userGroupRepo from "../repositories/userGroup.repository";
import { Request, Response } from "express";
import Group from "../models/group";
import UserGroup from "../models/userGroup";

export default class {
  static async getAllGroups(req: Request, res: Response, next: Function) {
    let groups = await repo.getAllGroups();
    return res.send({ groups });
  }

  static async getGroupById(req: Request, res: Response, next: Function) {
    let group = await repo.getGroupById(req.params.id);
    if (!group) {
      return res.status(404).send("group not found with id " + req.params.id);
    }
    return res.send({ group });
  }

  static async createGroup(req: Request, res: Response, next: Function) {
    if (!req.body.name || !req.body.description) {
      const err: Error = new Error("Group name and description are required.");
      return next(err);
    }
    const newGroup = new Group(req.body.name, req.body.description);
    const success = await repo.createGroup(newGroup);
    return res.send({ success, group: newGroup });
  }

  static async addMembers(req: Request, res: Response, next: Function) {
    if (!req.body.usersList || !req.body.groupId || !req.body.addedById) {
      const err: Error = new Error(
        "Group usersLists, groupId and addedById are required."
      );
      return next(err);
    }
    const members: string[] = [];
    for (let index = 0; index < req.body.usersList.length; index++) {
      const userId = req.body.usersList[index];
      const newUserGroup = new UserGroup(
        userId,
        req.body.groupId,
        req.body.addedById
      );
      const success = await userGroupRepo.createUserGroup(newUserGroup);
      if (success) members.push(userId);
    }

    return res.send({ success: true, members });
  }

  static async getMembers(req: Request, res: Response, next: Function) {
    if (!req.params.id) {
      const err: Error = new Error("groupId is required.");
      return next(err);
    }
    const userGroups = await userGroupRepo.getAllUserGroupByGroupId(
      req.params.id
    );

    return res.send({
      success: true,
      members: userGroups
        ? userGroups.map((userGroup) => userGroup.userId)
        : [],
    });
  }

  static async updateGroup(req: Request, res: Response, next: Function) {
    if (!req.body.id || !req.body.name || !req.body.description) {
      const err: Error = new Error(
        "Group id, name and description are required."
      );
      return next(err);
    }
    const newGroup = new Group(
      req.body.id,
      req.body.name,
      req.body.description
    );
    let success = await repo.updateGroup(newGroup);
    return res.send({ success, group: newGroup });
  }

  static async deleteGroup(req: Request, res: Response, next: Function) {
    if (!req.params.id) {
      const err: Error = new Error("Group id is required.");
      return next(err);
    }
    let deleted = await repo.deleteGroup(req.params.id);
    return res.send({ success: deleted });
  }
}
