
import { CreateCompanyDto } from '@/dto/company.dto';
import { loginAuth } from '@/services/auth.service';
import { createCompany } from '@/services/company.service';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'conductor' | 'company';
  companyId?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'conductor' | 'company') => Promise<void>;
  logout: () => void;
  register: (companyData: CreateCompanyDto) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, role: 'conductor' | 'company') => {

    try {
      const { access_token, user } = await loginAuth({ email, password });
      localStorage.setItem('token', access_token);
      setUser(user)
    } catch (error) {
      console.error('Credenciales invalidas', error);
      throw new Error('Credenciales invalidas')

    }
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (companyData: CreateCompanyDto) => {
    try {
      await createCompany(companyData);

      const { access_token, user } = await loginAuth({
        email: companyData.email,
        password: companyData.password
      })

      localStorage.setItem('token', access_token)

      setUser(user)
      // console.log('Registrando empresa:', companyData);
    } catch (error) {
      console.error('Error en el registro:', error);
      throw error;
    }
  };

  const value = {
    user,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
