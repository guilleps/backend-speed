export type UserRole = 'company' | 'conductor';

export interface AuthenticatedUser {
  userId: string;
  companyId: string;
  role: UserRole;
  email: string;
}
