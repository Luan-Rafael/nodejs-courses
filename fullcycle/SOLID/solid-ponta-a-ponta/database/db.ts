import fs from "node:fs/promises";

type Employee = {
  employee_id: number;
  name: string;
  role: string;
  type: string;
  wage?: number;
  salary?: number;
};

type TimeRecord = {
  employee_id: number;
  checkin_date: Date;
  checkout_date: Date;
};

type Database = {
  employee: Employee[];
  timeRecord: TimeRecord[];
};

const database = async (): Promise<Database> => {
  return await fs.readFile("./database.json").then((file) => {
    const database: Database = JSON.parse(file.toString());

    return {
      ...database,
      timeRecord: database.timeRecord.map((timeRecord) => {
        const checkin_date = new Date(timeRecord.checkin_date);
        const checkout_date = new Date(timeRecord.checkout_date);

        return {
          ...timeRecord,
          checkin_date,
          checkout_date,
        };
      }),
    };
  });
};

export const db = database;
