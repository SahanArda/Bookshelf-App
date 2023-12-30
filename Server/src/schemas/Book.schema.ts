import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  coverPictureUrl: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  addedBy: Types.ObjectId;
}

export const BookSchema = SchemaFactory.createForClass(Book);
