export default interface EmployeeData {
  getEmployee(employeeId: number): Promise<any>;

  getEmployeeTimeRecords(
    employeeId: number,
    month: number,
    year: number
  ): Promise<any[]>;
}
