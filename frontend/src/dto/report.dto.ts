export class CreateReportDto {
  dateFrom?: string;
  dateTo?: string;
  driver?: string;
  destination?: string;
  status?: string;
}

export class Report {
  id: string;
  dateFrom?: string;
  dateTo?: string;
  driver?: string;
  destination?: string;
  status?: string;
  createdAt: Date;
}

export class ReportFilters {
  dateFrom?: string;
  dateTo?: string;
  driver?: string;
  destination?: string;
  status?: string;
}