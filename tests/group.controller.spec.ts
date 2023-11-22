import { Request, Response } from "express";
import GroupController from "../controllers/groups.controller";
import GroupRepo from "../repositories/group.repository";

let req, res, next;

describe("GroupController", () => {
  it("Create Item throws error if no name in request body", () => {
    req = {
      body: {
        name: "Test Group 2",
        description: "Test Group 2 description",
      },
    };
    res = {
      send: jest.fn(),
    };
    next = jest.fn();

    GroupController.createGroup(req, res, next);
    expect(res.send).toHaveBeenCalledTimes(0);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
