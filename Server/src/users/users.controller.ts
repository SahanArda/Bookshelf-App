import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserResponseType } from 'src/types/userResponse.type';
import { LoginDto } from './dto/Login.dto';
import { AuthMiddleware, ExpressRequest } from 'src/auth/auth.middleware';

@Controller('users')
@UseGuards(AuthMiddleware)
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

  @Get('/user')
  async currentUser(
    @Request() request: ExpressRequest,
  ): Promise<UserResponseType> {
    if (!request.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.usersService.buildUserResponse(request.user);
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    }
    const updatedUser = await this.usersService.updateUser(id, updateUserDto);
    if (!updatedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return updatedUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    }
    const deletedUser = await this.usersService.deleteUser(id);
    if (!deletedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
