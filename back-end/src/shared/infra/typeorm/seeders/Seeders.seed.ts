import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { v4 as uuid } from "uuid";
import { dateGmt } from "@shared/utils/DateGmt-3";

export default class InsertSeeders implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    try {
      const date = await dateGmt(new Date());
      await connection
        .createQueryBuilder()
        .insert()
        .into("seeders")
        .values([
          {
            id: uuid(),
            name: "CreateRolesAndAdminUser",
            created_at: date,
            updated_at: date,
          },
        ])
        .execute();
    } catch (error) {
      console.log(error);
    }
  }
}
