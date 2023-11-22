import repo from "../repositories/expense.repository";
import expenseTransactionRepo from "../repositories/transaction.repository";
import userGroupRepo from "../repositories/userGroup.repository";
import { Request, Response } from "express";
import Expense from "../models/expense";
import ExpenseTransaction from "../models/transaction";

async function updateTransaction(
  splitType: string,
  participants: string[],
  amount: number,
  paidBy: string,
  expenseId: string
) {
  let amountPerUser = 0;
  const isPaidByExists = participants.find((userId) => userId === paidBy);
  if (splitType === "lend") {
    const totalParticipants = isPaidByExists
      ? participants.length - 1
      : participants.length;
    amountPerUser = amount / totalParticipants;
  } else {
    //split the expense equally
    const totalParticipants = isPaidByExists
      ? participants.length
      : participants.length + 1;
    amountPerUser = amount / totalParticipants;
  }

  const destinationUserIds = participants.filter(
    (participant) => participant !== paidBy
  );
  for (let index = 0; index < destinationUserIds.length; index++) {
    const userId = destinationUserIds[index];

    const newExpenseTransaction = new ExpenseTransaction(
      paidBy,
      userId,
      expenseId,
      Number(amountPerUser.toFixed(2))
    );
    await expenseTransactionRepo.createExpenseTransaction(
      newExpenseTransaction
    );
  }
}

export default class {
  static async getAllExpense(req: Request, res: Response, next: Function) {
    let expenses = await repo.getAllExpense();
    return res.send({ expenses });
  }

  static async getExpenseById(req: Request, res: Response, next: Function) {
    let expense = await repo.getExpenseById(req.params.id);
    if (!expense) {
      return res.status(404).send("expense not found with id " + req.params.id);
    }
    return res.send({ expense });
  }

  static async createExpense(req: Request, res: Response, next: Function) {
    if (
      !req.body.name ||
      !req.body.description ||
      !req.body.createdBy ||
      !req.body.paidBy ||
      !req.body.splitType ||
      (!req.body.groupId && !req.body.participants) ||
      !req.body.amount
    ) {
      const err: Error = new Error(
        "Expense name,description, createdBy,paidBy,splitType, (groupId or participants) and amount are required."
      );
      return next(err);
    }
    const { name, description, createdBy, paidBy, groupId, amount, splitType } =
      req.body;
    const newExpense = new Expense(
      name,
      description,
      createdBy,
      paidBy,
      groupId,
      amount
    );
    const success = await repo.createExpense(newExpense);

    // populate expense transaction table

    if (req.body.participants) {
      await updateTransaction(
        splitType,
        req.body.participants,
        amount,
        paidBy,
        newExpense.id
      );
    } else {
      const usersGroup = await userGroupRepo.getAllUserGroupByGroupId(groupId);
      const usersList = usersGroup.map((group) => group.userId);
      await updateTransaction(
        splitType,
        usersList,
        amount,
        paidBy,
        newExpense.id
      );
    }

    return res.send({ success, expense: newExpense });
  }

  static async updateExpense(req: Request, res: Response, next: Function) {
    if (
      !req.body.id ||
      !req.body.name ||
      !req.body.description ||
      !req.body.createdBy ||
      !req.body.groupId ||
      !req.body.amount
    ) {
      const err: Error = new Error(
        "Expense id, name,description, createdBy, groupId and amount required."
      );
      return next(err);
    }
    const { id, name, description, createdBy, groupId, amount } = req.body;
    const updatedExpense = new Expense(
      name,
      description,
      createdBy,
      groupId,
      amount,
      id
    );
    let success = await repo.updateExpense(updatedExpense);
    return res.send({ success, expense: updatedExpense });
  }

  static async deleteExpense(req: Request, res: Response, next: Function) {
    if (!req.params.id) {
      const err: Error = new Error("Expense id is required.");
      return next(err);
    }

    let deletedExpenseTransaction =
      await expenseTransactionRepo.deleteExpenseTransactionByExpenseId(
        req.params.id
      );
    let deleted = await repo.deleteExpense(req.params.id);
    return res.send({ success: deleted && deletedExpenseTransaction });
  }
}
