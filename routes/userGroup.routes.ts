import userGroupController from "../controllers/userGroup.controller";
import * as express from "express";
const router = express.Router();

router.get("/", userGroupController.getAllUserGroup);
router.post("/", userGroupController.createUserGroup);
router.delete("/:id", userGroupController.deleteUserGroup);
router.get("/:id", userGroupController.getUserGroupById);

export default router;
