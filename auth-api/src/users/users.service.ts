import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findOneById(user_id: number): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { user_id } });
  }

  async create(user: Partial<User>): Promise<User> {
    const hash = await bcrypt.hash(user.password, 10);
    const newUser = this.usersRepository.create({ ...user, password: hash });
    return this.usersRepository.save(newUser);
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    const existingUser = await this.usersRepository.findOne({ where: { user_id: id } });
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    const updatedUser = this.usersRepository.merge(existingUser, user);
    return this.usersRepository.save(updatedUser);
  }

  async delete(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
