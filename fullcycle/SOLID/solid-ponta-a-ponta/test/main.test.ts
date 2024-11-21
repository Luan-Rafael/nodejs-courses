import axios from "axios";

test("Deve calcular a folha de pagamento para um funcionario que ganha por hora", async () => {
  const input = {
    employeeId: 1,
    month: 12,
    year: 2024,
  };

  const response = await axios.post(
    "http://localhost:3000/calculate_payroll",
    input
  );

  const output = response.data;
  expect(output.employeeName).toBe("Pedro Silva");
  expect(output.salary).toBe(2000);
});

test("Deve calcular a folha de pagamento para um funcionario que ganha salário fixo", async () => {
  const input = {
    employeeId: 2,
    month: 12,
    year: 2024,
  };

  const response = await axios.post(
    "http://localhost:3000/calculate_payroll",
    input
  );

  const output = response.data;
  expect(output.employeeName).toBe("Ana Silva");
  expect(output.salary).toBe(4000);
});
