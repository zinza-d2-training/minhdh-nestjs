import { SearchDocumentDto } from './dto/search-document-dto';
import { isEmpty } from './../utils/validate';
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

  async findByName(condition: SearchDocumentDto) {
    try {
      const { name } = condition;
      if (!isEmpty(name)) {
        return await this.repoDocument.find({ where: { name: name } });
      } else {
        return await this.repoDocument.find();
      }
    } catch (err) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, dataUpdate: UpdateDocumentDto) {
    try {
      await this.repoDocument.update(id, dataUpdate);
      return { msg: 'Updated successfully!' };
    } catch (err) {
      throw new HttpException('Cannot update', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async create(newData: CreateDocumentDto) {
    try {
      return await this.repoDocument.save(newData);
    } catch (err) {
      throw new HttpException('Cannot create', HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
