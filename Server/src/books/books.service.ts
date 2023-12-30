// src/books/books.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from '../schemas/Book.schema';
import { CreateBookDto } from './dto/CreateBook.dto';
import { UpdateBookDto } from './dto/UpdateBook.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async createBook(createBookDto: CreateBookDto, addedBy: any): Promise<Book> {
    const newBook = new this.bookModel({
      ...createBookDto,
      addedBy,
    });
    return newBook.save();
  }

  async getBooks(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async getBookById(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async updateBook(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const updatedBook = await this.bookModel
      .findByIdAndUpdate(
        id,
        { $set: updateBookDto },
        { new: true, useFindAndModify: false },
      )
      .exec();

    if (!updatedBook) {
      throw new NotFoundException('Book not found');
    }

    return updatedBook;
  }

  async deleteBook(id: string): Promise<void> {
    const deletedBook = await this.bookModel.findByIdAndDelete(id).exec();
    if (!deletedBook) {
      throw new NotFoundException('Book not found');
    }
  }
}
