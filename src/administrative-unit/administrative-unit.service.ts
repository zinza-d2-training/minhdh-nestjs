import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Province } from 'src/typeorm/entities/Province';
import { District } from 'src/typeorm/entities/District';
import { Ward } from 'src/typeorm/entities/Ward';
import * as XLSX from 'xlsx';
import { Command, ConsoleIO } from '@squareboat/nest-console';

@Injectable()
export class AdministrativeUnitService {
  constructor(
    @InjectRepository(Province) private repoProvince: Repository<Province>,
    @InjectRepository(District) private repoDistrict: Repository<District>,
    @InjectRepository(Ward) private repoWard: Repository<Ward>
  ) {}

  async getProvinces() {
    try {
      return await this.repoProvince.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getDistricts(id: number) {
    try {
      return await this.repoDistrict.find({ where: { province_id: id } });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getWards(id: number) {
    try {
      return await this.repoWard.find({ where: { district_id: id } });
    } catch (error) {
      throw new Error(error);
    }
  }

  @Command('excel', { desc: 'import data' })
  async importData(_cli: ConsoleIO) {
    const provinces = [];
    const districts = [];
    const wards = [];
    _cli.info('Importing...');
    const workbook = XLSX.readFile('src/List_units.xls').Sheets;
    const worksheet = XLSX.utils.sheet_to_json(workbook['Sheet1']);
    worksheet.forEach((item) => {
      const includeProvince: boolean = provinces.some(
        (itemProvince) => itemProvince.name === item['Tỉnh Thành Phố']
      );
      if (!includeProvince) {
        provinces.push({ name: item['Tỉnh Thành Phố'] });
      }
    });
    await this.repoProvince.insert(provinces);
    const dataProvinces = await this.repoProvince.find();
    dataProvinces.forEach((itemProvince) => {
      const listDistricts = worksheet.filter((province) => {
        return itemProvince.name === province['Tỉnh Thành Phố'];
      });
      listDistricts.forEach((item) => {
        const includeDistrict: boolean = districts.some(
          (itemDistrict) => itemDistrict.name === item['Quận Huyện']
        );
        if (!includeDistrict) {
          districts.push({
            name: item['Quận Huyện'],
            province_id: itemProvince.id
          });
        }
      });
    });
    await this.repoDistrict.insert(districts);
    const dataDistricts = await this.repoDistrict.find();
    dataDistricts.forEach((itemDistrict) => {
      const listWards = worksheet.filter((district) => {
        return itemDistrict.name === district['Quận Huyện'];
      });
      listWards.forEach((item) => {
        const includeWard: boolean = wards.some(
          (itemWard) => itemWard.name === item['Phường Xã']
        );
        if (!includeWard) {
          wards.push({
            name: item['Phường Xã'],
            district_id: itemDistrict.id
          });
        }
      });
    });
    await this.repoWard.insert(wards);
    _cli.info('Import data success');
  }
}
