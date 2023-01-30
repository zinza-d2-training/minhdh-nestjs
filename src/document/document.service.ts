import { CreateDocumentDto } from './dto/create-document-dto';
import { UpdateDocumentDto } from './dto/update-document-dto';
import { Document } from './../typeorm/entities/Document';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private repoDocument: Repository<Document>
  ) {}

  async findAll() {
    return await this.repoDocument.find();
  }

  async findOne(id: number) {
    return await this.repoDocument.findOne({ where: { id: id } });
  }

  async update(id: number, dataUpdate: UpdateDocumentDto) {
    try {
      await this.repoDocument.update(id, dataUpdate);
      return { msg: 'Updated successfully!' };
    } catch (err) {
      throw new HttpException('Cannot update', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async upload(file: Express.Multer.File, newData: CreateDocumentDto) {
    try {
      const { filename } = file;
      await this.repoDocument.save({
        ...newData,
        link: filename
      });
      return {
        message: 'Uploaded successfully!'
      };
    } catch (err) {
      throw new HttpException('Cannot upload', HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
