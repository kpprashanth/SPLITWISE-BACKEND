import dotenv from "dotenv";
dotenv.config();
import express from "express";
import dao from "./repositories/dao";

import usersRoutes from "./routes/users.routes";
import groupsRoutes from "./routes/groups.routes";
import expenseRoutes from "./routes/expense.routes";
import userGroupRoutes from "./routes/userGroup.routes";

const port = 3000;
export const app = express();

app.listen(port, () =>
  console.log(`SplitWise example app listening on port ${port}!`)
);
app.use(express.json());

//  Script to setup sqlite DB in memory //
dao.setupDbForDev();
////////////////////////////////////

app.use("/api/users", usersRoutes);
app.use("/api/groups", groupsRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/userGroup", userGroupRoutes);
