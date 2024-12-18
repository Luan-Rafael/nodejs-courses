import express, { Request, Response } from "express";
import CalculatePayroll from "./CalculatePayroll";
import EmployeeDataDatabase from "./EmployeeDataDatabase";

const app = express();
app.use(express.json());

app.post("/calculate_payroll", async (req: Request, res: Response) => {
  const employeeData = new EmployeeDataDatabase();

  const calculatePayroll = new CalculatePayroll(employeeData);

  const output = await calculatePayroll.execute(req.body);

  res.json({
    employeeName: output?.employeeName,
    salary: output.salary,
  });
});

app.listen(3000);
