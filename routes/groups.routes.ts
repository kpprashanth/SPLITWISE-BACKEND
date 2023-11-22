import groupController from "../controllers/groups.controller";
import * as express from "express";
const router = express.Router();

router.get("/", groupController.getAllGroups);
router.post("/", groupController.createGroup);
router.put("/", groupController.updateGroup);
router.delete("/:id", groupController.deleteGroup);
router.get("/:id", groupController.getGroupById);
router.post("/addMembers", groupController.addMembers);
router.get("/members/:id", groupController.getMembers);

export default router;
