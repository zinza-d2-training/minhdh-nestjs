import { UpdateDocumentDto } from './dto/update-document-dto';
import { CreateDocumentDto } from './dto/create-document-dto';
import { DocumentService } from './document.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@Controller('documents')
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  @Get()
  async findAll() {
    return await this.documentService.findAll();
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Post(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() newData: UpdateDocumentDto
  ) {
    return await this.documentService.update(id, newData);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        }
      })
    })
  )
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() newData: CreateDocumentDto
  ) {
    return await this.documentService.upload(file, newData);
  }

  @Get('download/:filename')
  download(@Param('filename') filename: string, @Res() res: Response) {
    return res.sendFile(join(process.cwd(), 'uploads/' + filename));
  }
}
