import { v4 as uuidv4 } from "uuid";

export default class UserGroup {
  id!: string;
  userId!: string;
  groupId!: string;
  addedBy!: string;

  constructor(userId: string, groupId: string, addedBy: string, id = null) {
    this.userId = userId;
    this.groupId = groupId;
    this.addedBy = addedBy;
    this.id = id || uuidv4();
  }
}
