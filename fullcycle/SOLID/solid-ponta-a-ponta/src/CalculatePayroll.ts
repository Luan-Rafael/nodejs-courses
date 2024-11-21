import EmployeeData from "./EmployeeData";

export default class CalculatePayroll {
  constructor(readonly employeeData: EmployeeData) {}

  async execute(input: Input): Promise<Output> {
    const employee = await this.employeeData.getEmployee(input.employeeId);

    const timeRecords = await this.employeeData.getEmployeeTimeRecords(
      input.employeeId,
      input.month,
      input.year
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

    return {
      employeeName: employee?.name,
      salary,
    };
  }
}

type Input = {
  employeeId: number;
  month: number;
  year: number;
};

type Output = {
  employeeName: string;
  salary: number;
};
