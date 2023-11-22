import { v4 as uuidv4 } from "uuid";

export default class Group {
  id!: string;
  name!: string;
  description!: string;

  constructor(name: string, description: string, id = null) {
    this.description = description;
    this.name = name;
    this.id = id || uuidv4();
  }
}
