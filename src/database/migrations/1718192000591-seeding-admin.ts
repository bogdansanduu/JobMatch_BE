import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Roles } from '../../common/constants/user.constants';

export class SeedingAdmin1718192000591 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin', salt);

    await queryRunner.query(
      `INSERT INTO user (role, email, password, first_name, last_name, profile_picture, country, state, city, resume, resume_file, socket_id, created_at, updated_at) VALUES 
            ('${Roles.ADMIN}', 'admin@admin.com', '${hashedPassword}', 'Admin', 'Bogdan', '', 'Country', 'State', 'City', '', null, null, NOW(), NOW())`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM user WHERE email = 'admin@admin.com'`);
  }
}
