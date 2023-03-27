import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type userDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: true })
  state: boolean;

  @Prop({ default: 'USER' })
  role: ['USER' | 'ADMIN'];

  @Prop()
  img: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
