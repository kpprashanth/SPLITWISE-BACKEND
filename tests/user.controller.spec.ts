import { Request, Response } from "express";
import UserController from "../controllers/users.controller";
import ItemRepo from "../repositories/user.repository";

let req, res, next;

describe("UserController", () => {
  it("Create Item throws error if no name in request body", () => {
    req = {
      body: {
        email: "user2@gmail.com",
        fullName: "test@gmail.com",
      },
    };
    res = {
      send: jest.fn(),
    };
    next = jest.fn();

    UserController.createUser(req, res, next);
    expect(res.send).toHaveBeenCalledTimes(0);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
