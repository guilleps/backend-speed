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
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentCompany } from 'src/shared/decorators/current-company/current-company.decorator';

@Controller('users')
@UsePipes(ValidationPipe)
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(@Body() dto: CreateUserDto, @CurrentCompany() company) {
    console.log('Current Company:', company); 
    dto.companyId = company.companyId;
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: User) {
    return this.service.update(+id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
