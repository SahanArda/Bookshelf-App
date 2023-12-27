import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserResponseType } from 'src/types/userResponse.type';
import { LoginDto } from './dto/Login.dto';
import { compare } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const alreadyUser = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (alreadyUser)
      throw new HttpException(
        'Email is already taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async loginUser(loginDto: LoginDto): Promise<User> {
    const user = await this.userModel
      .findOne({ email: loginDto.email })
      .select('+password');

    if (!user)
      throw new HttpException('User is not found', HttpStatus.UNAUTHORIZED);

    const comparePassword = await compare(loginDto.password, user.password);

    if (!comparePassword)
      throw new HttpException('Password is incorrect', HttpStatus.UNAUTHORIZED);

    return user;
  }

  buildUserResponse(User: User): UserResponseType {
    return {
      firstName: User.firstName,
      lastName: User.lastName,
      email: User.email,
    };
  }

  // getUsers() {
  //   return this.userModel.find();
  // }

  // getUserById(id: string) {
  //   return this.userModel.findById(id);
  // }

  // async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
  //   return await this.userModel.findByIdAndUpdate(
  //     id,
  //     { $set: updateUserDto },
  //     { new: true, useFindAndModify: false },
  //   );
  // }

  // deleteUser(id: string) {
  //   return this.userModel.findByIdAndDelete(id);
  // }
}
