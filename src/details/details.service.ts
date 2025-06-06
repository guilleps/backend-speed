import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Detail } from './detail.entity';
import { Repository } from 'typeorm';
import { AlertRecordDto } from './dto/alert-record.dto';

@Injectable()
export class DetailsService {
  constructor(@InjectRepository(Detail) private repo: Repository<Detail>) {}

  async create(tripId: string, alertas: AlertRecordDto[]) {
    const records = alertas.map((alert) => ({
      tripId,
      triggerSecond: Math.round(
        alert.segundo ??
          (alert.minuto !== undefined
            ? alert.minuto * 60
            : alert.hora !== undefined
              ? alert.hora * 3600
              : 0),
      ),
      message: alert.mensaje,
      responded: alert.respondida,
    }));

    await this.repo.insert(records);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  findByTripId(tripId: string) {
    return this.repo.findOne({ where: { tripId } });
  }

  update(id: number, data: Partial<Detail>) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
