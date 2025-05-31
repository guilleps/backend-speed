import { CreateTripDto } from "./create-trip.dto";
import { Trip } from "./trip.entity";

export class TripMapper {
  static toEntity(dto: CreateTripDto): Trip {
    const trip = new Trip();
    trip.startDate = dto.startDate;
    trip.endDate = dto.endDate;
    trip.origin = { id: dto.origin } as any; // Assuming origin is a City entity
    trip.destination = { id: dto.destination } as any; // Assuming destination is a City entity
    trip.status = dto.status;
    trip.user = { id: dto.userId } as any; // Assuming user is a User entity
    if (dto.companyId) trip.companyId = dto.companyId;
    return trip;
  }

  static toDto(entity: Trip): CreateTripDto {
    const trip = new Trip();
    trip.startDate = entity.startDate;
    trip.endDate = entity.endDate;
    trip.origin = { id: entity.origin } as any; // Assuming origin is a City entity
    trip.destination = { id: entity.destination } as any; // Assuming destination is a City entity
    trip.status = entity.status;
    trip.user = entity.user.id; // Assuming user is a User entity
    trip.companyId = entity.companyId;
    return trip;
  }
}
