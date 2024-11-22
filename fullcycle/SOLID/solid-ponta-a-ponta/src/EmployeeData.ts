export default interface EmployeeData {
  getEmployee(employeeId: number): Promise<any>;

  getEmployeeTimeRecordsByMonthAndYear(
    employeeId: number,
    month: number,
    year: number
  ): Promise<any[]>;
}
