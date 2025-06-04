import { CreateTripDto } from "./create-trip.dto";
import { Trip } from "./trip.entity";

export class TripMapper {
  static toEntity(dto: CreateTripDto): Trip {
    const trip = new Trip();
    trip.startDate = dto.startDate;
    trip.endDate = dto.endDate;
    trip.origin = { id: dto.origin } as any; 
    trip.destination = { id: dto.destination } as any; 
    trip.status = dto.status;
    trip.user = { id: dto.userId } as any;
    if (dto.companyId) trip.companyId = dto.companyId;
    return trip;
  }

  static toDto(entity: Trip): CreateTripDto {
    const trip = new CreateTripDto();
    trip.startDate = entity.startDate;
    trip.endDate = entity.endDate;
    trip.origin = { id: entity.origin } as any; 
    trip.destination = { id: entity.destination } as any; 
    trip.status = entity.status;
    trip.userId = entity.user.id;
    trip.companyId = entity.companyId;
    return trip;
  }
}
