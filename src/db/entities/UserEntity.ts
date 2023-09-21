import * as typeorm from 'typeorm';

import BaseEntity from '../utils/BaseEntity';
import UserRoleEntity from './UserRoleEntity';

import { helpers, passwordHelper } from '../../utils';

@typeorm.Entity()
class UserEntity extends BaseEntity {
  @typeorm.PrimaryGeneratedColumn()
  userId: number;

  @typeorm.Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'now()',
  })
  lastActivity: Date;

  @typeorm.Column({
    type: 'text',
    unique: true,
    nullable: false,
  })
  email: string;

  @typeorm.Column({
    type: 'text',
    nullable: true,
  })
  firstName?: string;

  @typeorm.Column({
    type: 'text',
    nullable: true,
  })
  lastName?: string;

  fullName?: string;

  @typeorm.AfterLoad()
  setFullName() {
    this.fullName = helpers.getUserFullName(this);
  }

  @typeorm.Column({
    type: 'text',
    select: false,
    nullable: false,
  })
  password: string;

  @typeorm.BeforeInsert()
  hashPassword() {
    this.password = passwordHelper.hash(this.password);
  }

  @typeorm.BeforeInsert()
  @typeorm.BeforeUpdate()
  formatEmail() {
    this.email = this.email.toLowerCase().trim();
  }

  @typeorm.ManyToOne(() => UserRoleEntity, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @typeorm.JoinColumn()
  role?: UserRoleEntity;
}

export default UserEntity;
