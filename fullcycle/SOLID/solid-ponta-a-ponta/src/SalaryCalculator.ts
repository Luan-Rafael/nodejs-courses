export default abstract class SalaryCalculator {
  calculate(employee: any, timeRecords: any) {
    let hours = 0;

    for (const record of timeRecords) {
      hours +=
        (record.checkout_date.getTime() - record.checkin_date.getTime()) /
        (1000 * 60 * 60);
    }

    return this.calculateSalary(employee, hours);
  }

  abstract calculateSalary(employee: any, hours: number): number;
}

export class HourlyCalculator extends SalaryCalculator {
  calculateSalary(employee: any, hours: number): number {
    return hours * employee.wage!;
  }
}
export class SalariedCalculator extends SalaryCalculator {
  calculateSalary(employee: any, hours: number): number {
    const hourlyRate = employee.salary! / 40;
    const diff = (hours - 40) * hourlyRate;
    return employee.salary! + diff;
  }
}

export class SalaryCalculatorFactory {
  static create(employeeType: string) {
    if (employeeType === "salaried") return new SalariedCalculator();
    if (employeeType === "hourly") return new HourlyCalculator();
    throw new Error("type employee not found");
  }
}
