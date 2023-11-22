import { Request, Response } from "express";
import ExpenseController from "../controllers/expense.controller";
import ExpenseRepo from "../repositories/expense.repository";

let req, res, next;

describe("ExpenseController", () => {
  it("Create Item throws error if no name in request body", () => {
    req = {
      body: {
        name: "Expense2",
        description: "test Expense2",
        createdBy: "528a28c3-6ab1-4450-adb1-b32a56f6d6df",
        paidBy: "c98d70e9-8aa9-4180-8ac8-c5e99b495ad3",
        groupId: "1956f3a6-491a-4fa2-80cd-9216ea26a060",
        splitType: "lend",
        participants: ["ad5ad27f-5556-4de9-bbda-310ee551bf56"],
        amount: 500,
      },
    };
    res = {
      send: jest.fn(),
    };
    next = jest.fn();

    ExpenseController.createExpense(req, res, next);
    expect(res.send).toHaveBeenCalledTimes(0);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
