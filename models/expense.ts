import { v4 as uuidv4 } from "uuid";

export default class Expense {
  id!: string;
  name!: string;
  description!: string;
  createdBy!: string;
  paidBy!: string;
  groupId!: string;
  amount!: number;

  constructor(
    name: string,
    description: string,
    createdBy: string,
    paidBy: string,
    groupId: string,
    amount: number,
    id = null
  ) {
    this.description = description;
    this.name = name;
    this.createdBy = createdBy;
    this.paidBy = paidBy;
    this.groupId = groupId;
    this.amount = amount;
    this.id = id || uuidv4();
  }
}
