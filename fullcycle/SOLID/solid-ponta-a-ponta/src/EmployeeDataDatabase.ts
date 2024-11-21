import { db } from "../database/db";
import EmployeeData from "./EmployeeData";

export default class EmployeeDataDatabase implements EmployeeData {
  async getEmployee(employeeId: number) {
    const database = await db();

    const [employee] = database.employee.filter(
      (employee) => employee.employee_id === employeeId
    );

    return employee;
  }
  async getEmployeeTimeRecords(
    employeeId: number,
    month: number,
    year: number
  ) {
    const database = await db();

    const timeRecords = database.timeRecord.filter(
      (timeRecord) =>
        timeRecord.employee_id === employeeId &&
        timeRecord.checkin_date.getMonth() === month - 1 &&
        timeRecord.checkin_date.getFullYear() === year
    );

    return timeRecords;
  }
}
