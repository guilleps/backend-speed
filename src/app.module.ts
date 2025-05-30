import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { TripsModule } from './trips/trips.module';
import { CitiesModule } from './cities/cities.module';
import { SubsidiariesModule } from './subsidiaries/subsidiaries.module';
import { ReportsModule } from './reports/reports.module';
import { DetailsModule } from './details/details.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'ispeed_db',
      autoLoadEntities: true,
      synchronize: true, // Set to false in production
    }),
    UsersModule,
    CompaniesModule,
    TripsModule,
    CitiesModule,
    SubsidiariesModule,
    ReportsModule,
    DetailsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
