import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, userDocument } from 'src/users/user.schema';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegAuthDto } from './dto/reg-auth.dto';
import { hashSync, genSaltSync, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<userDocument>,
    private jwtService: JwtService,
  ) {}

  async register(regAuthDto: RegAuthDto) {
    const { password, email } = regAuthDto;
    const user = await this.userModel.findOne({ email });
    if (user) throw new HttpException('Email already resgistered', 403);
    const salt = genSaltSync();
    const encrypt = hashSync(password, salt);
    regAuthDto = { ...regAuthDto, password: encrypt };
    const reg = await this.userModel.create(regAuthDto);
    return reg;
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { password, email } = loginAuthDto;
    const user = await this.userModel.findOne({ email });
    if (!user) throw new HttpException('Wrong Pasword or Mail', 404);
    const isPassword = await compare(password, user.password);
    if (!isPassword) throw new HttpException('Wrong Pasword or Mail', 403);
    const payload = { id: user.id };
    const token = this.jwtService.sign(payload);
    return { user, token };
  }

  async googleLogin(req) {
    if (!req.user) return 'No user from google';
    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
