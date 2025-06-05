export interface JwtPayload {
  sub: string;
  email: string;
  companyId: string;
  role: 'COMPANY';
}
