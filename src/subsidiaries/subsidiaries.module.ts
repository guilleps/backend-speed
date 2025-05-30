import { Module } from '@nestjs/common';
import { SubsidiariesController } from './subsidiaries.controller';
import { SubsidiariesService } from './subsidiaries.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subsidiary } from './subsidiary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subsidiary])],
  controllers: [SubsidiariesController],
  providers: [SubsidiariesService],
})
export class SubsidiariesModule {}
