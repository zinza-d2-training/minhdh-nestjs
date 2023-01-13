import { UpdateSitesDto } from './dto/update-sites-dto';
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
    @InjectRepository(District) private repoDistrict: Repository<District>,
    @InjectRepository(Ward) private repoWard: Repository<Ward>
  ) {}

  async findAll() {
    return await this.repoVaccinationSites.find();
  }

  async findAllWithCondition(condition: SearchVaccinationSitesDto) {
    try {
      const { province_id, district_id, ward_id } = condition;
      if (!isEmpty(province_id)) {
        if (!isEmpty(district_id)) {
          if (!isEmpty(ward_id)) {
            return await this.repoVaccinationSites.find({
              where: { ward_id: ward_id }
            });
          } else {
            const listWards = await this.repoWard.find({
              where: { district_id: district_id }
            });
            const listVaccineSites = [];
            const vaccinationSites = await this.repoVaccinationSites.find();
            listWards.forEach((ward) => {
              const findVaccineSites = vaccinationSites.filter(
                (vaccinationSite) => {
                  return vaccinationSite.ward_id === ward.id;
                }
              );
              if (findVaccineSites) {
                listVaccineSites.push(...findVaccineSites);
              }
            });
            return listVaccineSites;
          }
        } else {
          const districts = await this.repoDistrict.find({
            where: { province_id: province_id }
          });
          const listWards = [];
          const wards = await this.repoWard.find();
          districts.forEach((district) => {
            const findWards = wards.filter((ward) => {
              return ward.district_id === district.id;
            });
            if (findWards) {
              listWards.push(...findWards);
            }
          });
          console.log(listWards);
          const listVaccineSites = [];
          const vaccinationSites = await this.repoVaccinationSites.find();
          listWards.forEach((ward) => {
            const findVaccineSites = vaccinationSites.filter(
              (vaccinationSite) => {
                return vaccinationSite.ward_id === ward.id;
              }
            );
            if (findVaccineSites) {
              listVaccineSites.push(...findVaccineSites);
            }
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

  async updateVaccinationSiteById(id: number, dataUpdate: UpdateSitesDto) {
    try {
      return await this.repoVaccinationSites.update({ id }, dataUpdate);
    } catch (err) {
      throw new HttpException('Cannot create', HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
