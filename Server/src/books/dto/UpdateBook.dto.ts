import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBookDto {
  @IsNotEmpty()
  @IsString()
  title?: string;

  @IsNotEmpty()
  @IsString()
  author?: string;

  @IsNotEmpty()
  @IsString()
  coverPictureUrl?: string;
}
