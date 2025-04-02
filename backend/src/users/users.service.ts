import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      return await this.repo.find();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching users');
    }
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    try {
      const user = this.repo.create(dto);
      return await this.repo.save(user);
    } catch (error) {
      throw new BadRequestException('Error creating user');
    }
  }
}
