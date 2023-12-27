import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserResponseType } from 'src/types/userResponse.type';
import { LoginDto } from './dto/Login.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseType> {
    // console.log(createUserDto);
    const user = await this.usersService.createUser(createUserDto);
    return this.usersService.buildUserResponse(user);
  }

  @Post('/login')
  async loginUser(@Body() loginDto: LoginDto): Promise<UserResponseType> {
    // console.log(loginDto);
    const user = await this.usersService.loginUser(loginDto);
    return this.usersService.buildUserResponse(user);
  }

  // @Get()
  // getUsers() {
  //   return this.usersService.getUsers();
  // }

  // // users/:id
  // @Get(':id')
  // async getUserById(@Param('id') id: string) {
  //   const isValid = mongoose.Types.ObjectId.isValid('id');
  //   if (!isValid) throw new HttpException('User not found', 404);

  //   const findUser = await this.usersService.getUserById(id);
  //   if (!findUser) throw new HttpException('User not found', 404);
  //   return findUser;
  // }

  // @Patch(':id')
  // async updateUser(
  //   @Param('id') id: string,
  //   @Body() updateUserDto: UpdateUserDto,
  // ) {
  //   const isValid = mongoose.Types.ObjectId.isValid(id);
  //   if (!isValid) throw new HttpException('Invalid ID', 400);
  //   const updatedUser = await this.usersService.updateUser(id, updateUserDto);
  //   if (!updatedUser) throw new HttpException('User not found', 404);
  // }

  // @Delete(':id')
  // async deleteUser(@Param('id') id: string) {
  //   const isValid = mongoose.Types.ObjectId.isValid(id);
  //   if (!isValid) throw new HttpException('Invalid ID', 400);

  //   const deletedUser = await this.usersService.deleteUser(id);
  //   if (!deletedUser) throw new HttpException('User not found', 404);
  //   return;
  // }
}
