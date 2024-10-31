import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signUp(userDTO: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = userDTO.firstName;
    user.lastName = userDTO.lastName;
    user.email = userDTO.email;
    user.password = userDTO.password;

    user.password = await bcrypt.hash(user.password, 10);

    const findUser = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (findUser) {
      throw new HttpException('User Already Exists', 422);
    }

    return this.userRepository.save(user);
  }
}
