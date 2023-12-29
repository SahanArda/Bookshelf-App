import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { hash } from 'bcrypt';

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', async function (next: () => void) {
  this.password = await hash(this.password, 10);
  next();
});
