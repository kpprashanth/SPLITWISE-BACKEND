import { v4 as uuidv4 } from "uuid";

export default class User {
  id!: string;
  email!: string;
  fullName!: string;
  balance!: number;

  constructor(email: string, fullName: string, id = null, balance = 0) {
    this.fullName = fullName;
    this.email = email;
    this.id = id || uuidv4();
    this.balance = balance;
  }
}
