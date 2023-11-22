import userController from "../controllers/users.controller";
import * as express from "express";
const router = express.Router();

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.put("/", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.get("/:id", userController.getUserById);
router.get("/friends/:id", userController.friends);
router.get("/balance/:id", userController.balance);
router.post("/settle", userController.settle);

export default router;
