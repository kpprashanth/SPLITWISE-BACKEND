import { v4 as uuidv4 } from "uuid";

export default class ExpenseTransaction {
  id!: string;
  source!: string;
  destination!: string;
  expenseId!: string;
  amount!: number;

  constructor(
    source: string,
    destination: string,
    expenseId: string,
    amount: number,
    id = null
  ) {
    this.source = source;
    this.destination = destination;
    this.expenseId = expenseId;
    this.amount = amount;
    this.destination = destination;
    this.id = id || uuidv4();
  }
}
