
"use client";
import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { LayoutDashboard } from 'lucide-react'; // Changed Mails to LayoutDashboard

interface AuthContextType {
  isAuthenticated: boolean;
  login: (employeeId: string, pass: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  employeeDetails: { id: string; name: string; role: string } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_EMPLOYEE_ID = "20254120";
const MOCK_PASSWORD = "sumanth@20254120";
const MOCK_EMPLOYEE_DETAILS = {
  id: "20254120",
  name: "Cherla Sumanth",
  role: "Data Analyst, Reception Representative",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [employeeDetails, setEmployeeDetails] = useState<{ id: string; name: string; role: string } | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedAuth = sessionStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
      setEmployeeDetails(MOCK_EMPLOYEE_DETAILS); 
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated && pathname.startsWith('/dashboard')) {
        router.push('/login'); // Redirect to /login for dashboard access
      } else if (isAuthenticated && pathname === '/login') { // If authenticated and on login page
        router.push('/dashboard');
      }
      // Allow authenticated users to visit the homepage ('/')
      // No specific redirect if authenticated and on '/'
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  const login = async (employeeId: string, pass: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500)); 
    if (employeeId === MOCK_EMPLOYEE_ID && pass === MOCK_PASSWORD) {
      sessionStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
      setEmployeeDetails(MOCK_EMPLOYEE_DETAILS);
      router.push('/dashboard');
      setIsLoading(false);
      return true;
    }
    setIsAuthenticated(false);
    setEmployeeDetails(null);
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    setEmployeeDetails(null);
    router.push('/login'); // Redirect to /login on logout
  };
  
  // Show loading screen only for protected routes or login page while initial auth check
  if (isLoading && (pathname.startsWith('/dashboard') || pathname === '/login')) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
        <LayoutDashboard className="w-16 h-16 mb-4 animate-pulse text-primary" />
        <p className="text-xl">Loading Medicentral...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading, employeeDetails }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
