import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/CreateBook.dto';
import { UpdateBookDto } from './dto/UpdateBook.dto';
import { Book } from '../schemas/Book.schema';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post()
  async createBook(
    @Body() createBookDto: CreateBookDto,
    @Request() req,
  ): Promise<Book> {
    if (!req.user) {
      throw new UnauthorizedException('User not authenticated');
    }

    const addedBy = req.user._id; // The user object itself
    return this.booksService.createBook(createBookDto, addedBy);
  }

  @Get()
  async getBooks(@Request() req): Promise<Book[]> {
    if (!req.user) {
      throw new UnauthorizedException('User not authenticated');
    }

    const addedBy = req.user._id; // Extract user ID from the request
    return this.booksService.getBooks(addedBy);
  }

  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<Book> {
    return this.booksService.getBookById(id);
  }

  @Patch(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.booksService.updateBook(id, updateBookDto);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<void> {
    return this.booksService.deleteBook(id);
  }
}
