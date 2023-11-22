import ExpenseTransaction from "../models/transaction";
import dao from "./dao";

export default class {
  static async getAllExpenseTransaction(): Promise<ExpenseTransaction[]> {
    const expenseTransactions = await dao.all(
      "SELECT * FROM expenseTransaction",
      []
    );
    return <ExpenseTransaction[]>expenseTransactions;
  }

  static async getExpenseTransactionById(
    id: string
  ): Promise<ExpenseTransaction> {
    const expenseTransaction = await dao.get(
      "SELECT * FROM expenseTransaction WHERE id = ?",
      [id]
    );
    return <ExpenseTransaction>expenseTransaction;
  }

  static async getExpenseTransactionBySourceId(
    id: string
  ): Promise<ExpenseTransaction> {
    const expenseTransaction = await dao.all(
      "SELECT * FROM expenseTransaction WHERE source = ?",
      [id]
    );
    return <ExpenseTransaction>expenseTransaction;
  }

  // to get all the amount sent by the user
  static async getExpenseTransactionOfSourceGroupByDestination(
    id: string
  ): Promise<ExpenseTransaction[]> {
    const expenseTransaction = await dao.all(
      "SELECT id,source, destination, expenseId, SUM(amount) as amount FROM expenseTransaction WHERE source = ? GROUP BY destination",
      [id]
    );
    return <ExpenseTransaction[]>expenseTransaction;
  }

  // to get all the amount sent to the user
  static async getExpenseTransactionOfDestinationGroupBySource(
    id: string
  ): Promise<ExpenseTransaction[]> {
    const expenseTransaction = await dao.all(
      "SELECT id,source, destination, expenseId, SUM(amount) as amount FROM expenseTransaction WHERE destination = ? GROUP BY destination",
      [id]
    );
    return <ExpenseTransaction[]>expenseTransaction;
  }

  // to get all the amount sent to the user
  static async getGroupExpenseTransactionOfByDestination(
    sourceId: string,
    destinationId: string
  ): Promise<ExpenseTransaction | null> {
    const expenseTransaction = await dao.get(
      "SELECT id,source, destination, expenseId, SUM(amount) as amount FROM expenseTransaction WHERE source = ? AND destination = ? GROUP BY destination",
      [sourceId, destinationId]
    );
    if (!expenseTransaction) return null;
    return <ExpenseTransaction>expenseTransaction;
  }

  static async getExpenseTransactionByDestinationId(
    id: string
  ): Promise<ExpenseTransaction> {
    const expenseTransaction = await dao.all(
      "SELECT * FROM expenseTransaction WHERE destination = ?",
      [id]
    );
    return <ExpenseTransaction>expenseTransaction;
  }

  static async getExpenseTransactionByExpenseId(
    id: string
  ): Promise<ExpenseTransaction> {
    const expenseTransaction = await dao.all(
      "SELECT * FROM expenseTransaction WHERE expenseId = ?",
      [id]
    );
    return <ExpenseTransaction>expenseTransaction;
  }

  static async createExpenseTransaction(
    expenseTransaction: ExpenseTransaction
  ): Promise<boolean> {
    const insertExpenseTransactions = `INSERT INTO expenseTransaction (id, source, destination, expenseId, amount) VALUES (?,?,?,?,?);`;
    try {
      const { id, source, destination, expenseId, amount } = expenseTransaction;
      await dao.run(insertExpenseTransactions, [
        id,
        source,
        destination,
        expenseId,
        amount,
      ]);
      return true;
    } catch (ex) {
      console.error(ex);
      return false;
    }
  }

  static async deleteExpenseTransaction(id: string) {
    const stmt = `DELETE FROM expenseTransaction WHERE id = ?;`;
    try {
      await dao.run(stmt, [id]);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  static async deleteExpenseTransactionByExpenseId(expenseId: string) {
    const stmt = `DELETE FROM expenseTransaction WHERE expenseId = ?;`;
    try {
      await dao.run(stmt, [expenseId]);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
