import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './create-company.dto';
import { Company } from './company.entity';
import { CurrentCompany } from 'src/shared/decorators/current-company/current-company.decorator';
import { AuthenticatedUser } from 'src/shared/interfaces/authenticated-user.interface';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';

@Controller('companies')
@UsePipes(ValidationPipe)
export class CompaniesController {
  constructor(private readonly service: CompaniesService) { }

  @Post()
  create(@Body() dto: CreateCompanyDto) {
    return this.service.create(dto);
  }

  @Get('name')
  @UseGuards(JwtGuard)
  getName(@CurrentCompany() user: AuthenticatedUser) {
    console.log('user', user);
    
    return this.service.getName(user.companyId);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
