import express, { Request, Response } from "express";
import { db } from "../database/db";

const app = express();
app.use(express.json());

app.post("/calculate_payroll", async (req: Request, res: Response) => {
  const database = await db();

  const [employee] = database.employee.filter(
    (employee) => employee.employee_id === req.body.employeeId
  );

  const timeRecords = database.timeRecord.filter(
    (timeRecord) => timeRecord.employee_id === req.body.employeeId
  );

  let hours = 0;

  for (const record of timeRecords) {
    hours +=
      (record.checkout_date.getTime() - record.checkin_date.getTime()) /
      (1000 * 60 * 60);
  }

  let salary = 0;

  if (employee.type === "hourly") {
    salary = hours * employee.wage!;
  }

  if (employee.type === "salaried") {
    const hourlyRate = employee.salary! / 40;
    const diff = (hours - 40) * hourlyRate;
    salary = employee.salary! + diff;
  }

  res.json({
    employeeName: employee?.name,
    salary,
  });
});

app.listen(3000);
