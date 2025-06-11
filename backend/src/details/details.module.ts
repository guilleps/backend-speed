import { Module } from '@nestjs/common';
import { DetailsController } from './details.controller';
import { DetailsService } from './details.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Detail } from './detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Detail])],
  controllers: [DetailsController],
  providers: [DetailsService],
  exports: [DetailsService],
})
export class DetailsModule {}
