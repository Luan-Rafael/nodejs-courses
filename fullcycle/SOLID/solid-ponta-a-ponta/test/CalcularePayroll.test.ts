import CalculatePayroll from "../src/CalculatePayroll";
import EmployeeData from "../src/EmployeeData";

test("Deve calcular a folha de pagamento para um funcionario que ganha por hora", async () => {
  const input = {
    employeeId: 1,
    month: 12,
    year: 2024,
  };

  const employeeData: EmployeeData = {
    async getEmployee(employeeId: number): Promise<any> {
      return { name: "Pedro Silva", wage: 50, type: "hourly" };
    },

    async getEmployeeTimeRecords(
      employeeId: number,
      month: number,
      year: number
    ): Promise<any> {
      return [
        {
          checkin_date: new Date("2024-12-01T08:00:00-03:00"),
          checkout_date: new Date("2024-12-01T12:00:00-03:00"),
        },
      ];
    },
  };

  const calculatePayroll = new CalculatePayroll(employeeData);
  const output = await calculatePayroll.execute(input);

  expect(output.employeeName).toBe("Pedro Silva");
  expect(output.salary).toBe(200);
});
