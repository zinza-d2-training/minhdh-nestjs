import { SearchDocumentDto } from './dto/search-document-dto';
import { CreateDocumentDto } from './dto/create-document-dto';
import { DocumentService } from './document.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('document')
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  @Get()
  async findAll() {
    return await this.documentService.findAll();
  }

  @Get('condition')
  async findByName(@Query('name') name: string | null | undefined) {
    const condition: SearchDocumentDto = {
      name
    };
    return await this.documentService.findByName(condition);
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() newData: CreateDocumentDto) {
    return await this.documentService.create(newData);
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Post(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() newData: CreateDocumentDto
  ) {
    return await this.documentService.update(id, newData);
  }
}
