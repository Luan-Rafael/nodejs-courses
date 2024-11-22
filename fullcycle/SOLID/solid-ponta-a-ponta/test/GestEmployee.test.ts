import CalculatePayroll from "../src/CalculatePayroll";
import EmployeeData from "../src/EmployeeData";
import EmployeeDataDatabase from "../src/EmployeeDataDatabase";
import GetEmployee from "../src/GetEmployee";

test("Deve obter um funcionario", async () => {
  const employeeData = new EmployeeDataDatabase();
  const getEmployee = new GetEmployee(employeeData);

  const output = await getEmployee.execute(1);

  expect(output.employeeName).toBe("Pedro Silva");
  expect(output.wage).toBe(50);
  expect(output.type).toBe("hourly");
});
