import { Province } from './../typeorm/entities/Province';
import { isEmpty } from './../utils/validate';
import { SearchVaccinationSitesDto } from './dto/search-vaccination-sites.dto';
import { VaccinationSitesDto } from './dto/vaccination-sites-dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VaccinationSites } from 'src/typeorm/entities/VaccinationSites';
import { Repository } from 'typeorm';
import { District } from 'src/typeorm/entities/District';
import { Ward } from 'src/typeorm/entities/Ward';

@Injectable()
export class VaccinationSitesService {
  constructor(
    @InjectRepository(VaccinationSites)
    private repoVaccinationSites: Repository<VaccinationSites>,
    @InjectRepository(Province) private repoProvince: Repository<Province>,
    @InjectRepository(District) private repoDistrict: Repository<District>,
    @InjectRepository(Ward) private repoWard: Repository<Ward>
  ) {}

  async findByWardId(id: number) {
    try {
      const ward = await this.repoWard.findOne({ where: { id: id } });
      const district = await this.repoDistrict.findOne({
        where: { id: ward.district_id }
      });
      const province = await this.repoProvince.findOne({
        where: { id: district.province_id }
      });
      return {
        wardName: ward.name,
        districtName: district.name,
        provinceName: province.name
      };
    } catch (err) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async findAllWithCondition(condition: SearchVaccinationSitesDto) {
    try {
      if (!isEmpty(condition.province_id)) {
        if (!isEmpty(condition.district_id)) {
          if (!isEmpty(condition.ward_id)) {
            return await this.repoVaccinationSites.find({
              where: { ward_id: condition.ward_id }
            });
          } else {
            const listWards = await this.repoWard.find({
              where: { district_id: condition.district_id }
            });
            const listVaccineSites = [];
            listWards.forEach(async (ward) => {
              const vaccineSites = await this.repoVaccinationSites.find({
                where: { ward_id: ward.id }
              });
              listVaccineSites.push(...vaccineSites);
            });
            return listVaccineSites;
          }
        } else {
          const districts = await this.repoDistrict.find({
            where: { province_id: condition.province_id }
          });
          const listWards = [];
          districts.forEach(async (district) => {
            const wards = await this.repoWard.find({
              where: { district_id: district.id }
            });
            listWards.push(...wards);
          });
          const listVaccineSites = [];
          listWards.forEach(async (ward) => {
            const vaccineSites = await this.repoVaccinationSites.find({
              where: { ward_id: ward.id }
            });
            listVaccineSites.push(...vaccineSites);
          });
          return listVaccineSites;
        }
      } else {
        return await this.repoVaccinationSites.find();
      }
    } catch (err) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async findVaccinationSitesById(id: number) {
    try {
      return await this.repoVaccinationSites.findOne({ where: { id } });
    } catch (err) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async createVaccinationSite(newData: VaccinationSitesDto) {
    try {
      const newVaccinationSite = this.repoVaccinationSites.create(newData);
      return await this.repoVaccinationSites.save(newVaccinationSite);
    } catch (err) {
      throw new HttpException('Cannot create', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async updateVaccinationSiteById(id: number, dataUpdate: VaccinationSitesDto) {
    try {
      return await this.repoVaccinationSites.update({ id }, dataUpdate);
    } catch (err) {
      throw new HttpException('Cannot create', HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
