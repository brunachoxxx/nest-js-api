import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, userDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<userDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const userCreated = await this.userModel.create(createUserDto);
    return userCreated;
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userUpdated = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
    );
    return userUpdated;
  }

  async remove(id: string) {
    const userDeleted = await this.userModel.findByIdAndUpdate(
      id,
      { state: false },
      { new: true },
    );
    return userDeleted;
  }
}
