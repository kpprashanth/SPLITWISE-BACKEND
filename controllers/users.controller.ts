import repo from "../repositories/user.repository";
import { Request, Response } from "express";
import User from "../models/user";
import expenseTransactionRepo from "../repositories/transaction.repository";
import ExpenseTransaction from "../models/transaction";

export default class {
  static async getAllUsers(req: Request, res: Response, next: Function) {
    let users = await repo.getAllUsers();
    return res.send({ users });
  }

  static async getUserById(req: Request, res: Response, next: Function) {
    let user = await repo.getUserById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found with id " + req.params.id);
    }
    return res.send({ user });
  }

  static async createUser(req: Request, res: Response, next: Function) {
    if (!req.body.fullName || !req.body.email) {
      const err: Error = new Error("User name and email are required.");
      return next(err);
    }
    const newUser = new User(req.body.email, req.body.fullName);
    const success = await repo.createUser(newUser);
    return res.send({ success, user: newUser });
  }

  static async updateUser(req: Request, res: Response, next: Function) {
    if (!req.body.id || !req.body.fullName || !req.body.email) {
      const err: Error = new Error("User id, name and email are required.");
      return next(err);
    }
    const newUser = new User(req.body.id, req.body.email, req.body.fullName);
    let success = await repo.updateUser(newUser);
    return res.send({ success, user: newUser });
  }

  static async deleteUser(req: Request, res: Response, next: Function) {
    if (!req.params.id) {
      const err: Error = new Error("User id is required.");
      return next(err);
    }
    let deleted = await repo.deleteUser(req.params.id);
    return res.send({ success: deleted });
  }

  static async friends(req: Request, res: Response, next: Function) {
    let user = await repo.getUserById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found with id " + req.params.id);
    }
    const totalAmountSent =
      await expenseTransactionRepo.getExpenseTransactionOfSourceGroupByDestination(
        user.id
      );
    const totalAmountReceived =
      await expenseTransactionRepo.getExpenseTransactionOfDestinationGroupBySource(
        user.id
      );
    let friendsList = totalAmountSent.map((sent) => ({
      ...sent,
      amount: -sent.amount,
    }));
    friendsList = [
      ...friendsList,
      ...totalAmountReceived.map((sent) => ({ ...sent, amount: sent.amount })),
    ];
    console.log({ totalAmountReceived, totalAmountSent });
    return res.send({ user, friendsList });
  }

  static async balance(req: Request, res: Response, next: Function) {
    let user = await repo.getUserById(req.params.id);
    if (!user) {
      return res.status(404).send("expense not found with id " + req.params.id);
    }
    let balance = 0;
    const totalAmountSent =
      await expenseTransactionRepo.getExpenseTransactionOfSourceGroupByDestination(
        user.id
      );
    const totalAmountReceived =
      await expenseTransactionRepo.getExpenseTransactionOfDestinationGroupBySource(
        user.id
      );
    totalAmountSent.forEach((sent) => {
      balance = balance - sent.amount;
    });
    totalAmountReceived.forEach((sent) => {
      balance = balance + sent.amount;
    });

    return res.send({ user, balance });
  }

  static async settle(req: Request, res: Response, next: Function) {
    if (!req.body.id || !req.body.userList || !req.body.userList.length) {
      const err: Error = new Error("User id, userLists are required.");
      return next(err);
    }
    let user = await repo.getUserById(req.body.id);
    if (!user) {
      return res.status(404).send(user);
    }

    for (let index = 0; index < req.body.userList.length; index++) {
      const destination = req.body.userList[index];
      const amountSent =
        await expenseTransactionRepo.getGroupExpenseTransactionOfByDestination(
          user.id,
          destination
        );
      const amountReceived =
        await expenseTransactionRepo.getGroupExpenseTransactionOfByDestination(
          destination,
          user.id
        );
      if (amountSent && amountReceived) {
        const finalSettlement = amountSent.amount - amountReceived.amount;
        if (finalSettlement > 0) {
          const newExpenseTransaction = new ExpenseTransaction(
            destination,
            user.id,
            "direct",
            finalSettlement
          );
          await expenseTransactionRepo.createExpenseTransaction(
            newExpenseTransaction
          );
        } else {
          const newExpenseTransaction = new ExpenseTransaction(
            user.id,
            destination,
            "direct",
            finalSettlement
          );
          await expenseTransactionRepo.createExpenseTransaction(
            newExpenseTransaction
          );
        }
      } else if (amountSent) {
        const newExpenseTransaction = new ExpenseTransaction(
          destination,
          user.id,
          "direct",
          amountSent.amount
        );
        await expenseTransactionRepo.createExpenseTransaction(
          newExpenseTransaction
        );
      } else if (amountReceived) {
        const newExpenseTransaction = new ExpenseTransaction(
          user.id,
          destination,
          "direct",
          amountReceived.amount
        );
        await expenseTransactionRepo.createExpenseTransaction(
          newExpenseTransaction
        );
      } else {
        return res.send({ success: true, message: "nothing to settle" });
      }
    }

    return res.send({ success: true, message: "all settled" });
  }
}
