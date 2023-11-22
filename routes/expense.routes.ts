import expenseController from "../controllers/expense.controller";
import * as express from "express";
const router = express.Router();

router.get("/", expenseController.getAllExpense);
router.post("/", expenseController.createExpense);
router.put("/", expenseController.updateExpense);
router.delete("/:id", expenseController.deleteExpense);
router.get("/:id", expenseController.getExpenseById);

export default router;
