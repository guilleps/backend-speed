import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './create-report.dto';
import { CurrentUser } from 'src/shared/decorators/current-user/current-user.decorator';
import { AuthenticatedUser } from 'src/shared/interfaces/authenticated-user.interface';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';

@Controller('reports')
@UseGuards(JwtGuard)
export class ReportsController {
  constructor(private readonly service: ReportsService) { }

  @Post()
  create(@Body() dto: CreateReportDto, @CurrentUser() user: AuthenticatedUser) {
    return this.service.create(dto, user);
  }

  @Get()
  @UseGuards(JwtGuard)
  findByRole(@CurrentUser() user: AuthenticatedUser) {
    return this.service.findReportsByUserOrCompany(user);
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
