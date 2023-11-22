import dao from "./dao";
import Expense from "../models/expense";

export default class {
  static async getAllExpense(): Promise<Expense[]> {
    const expenses = await dao.all("SELECT * FROM expense", []);
    return <Expense[]>expenses;
  }

  static async getExpenseByName(name: string): Promise<Expense> {
    const expense = await dao.get("SELECT * FROM expense WHERE name =?", [
      name,
    ]);
    return <Expense>expense;
  }

  static async getExpenseById(id: string): Promise<Expense> {
    const expense = await dao.get("SELECT * FROM expense WHERE id = ?", [id]);
    return <Expense>expense;
  }

  static async createExpense(expense: Expense): Promise<boolean> {
    const insertExpenses = `INSERT INTO expense (id,name, description, createdBy, groupId, amount) VALUES (?,?,?,?,?,?);`;
    try {
      const { id, name, description, createdBy, groupId, amount } = expense;
      await dao.run(insertExpenses, [
        id,
        name,
        description,
        createdBy,
        groupId,
        amount,
      ]);
      return true;
    } catch (ex) {
      console.error(ex);
      return false;
    }
  }
  static async updateExpense(expense: Expense): Promise<boolean> {
    const stmt = `UPDATE expense SET name = ?, description= ? , amount= ? WHERE id = ?;`;
    try {
      await dao.run(stmt, [
        expense.name,
        expense.description,
        expense.amount,
        expense.id,
      ]);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  static async deleteExpense(id: string) {
    const stmt = `DELETE FROM expense WHERE id = ?;`;
    try {
      await dao.run(stmt, [id]);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
