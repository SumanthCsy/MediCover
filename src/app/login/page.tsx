
"use client";
import { LoginForm } from "@/components/auth/login-form";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Building } from "lucide-react";

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || isAuthenticated) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="animate-pulse rounded-full bg-primary/50 h-12 w-12"></div>
        </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-secondary/30">
      <div className="text-center mb-8">
        <Building className="w-16 h-16 text-primary mx-auto mb-3" />
        <h1 className="text-3xl font-bold text-foreground">Medicentral Portal</h1>
        <p className="text-lg text-muted-foreground mt-1">Sign in to access your account</p>
      </div>
      <LoginForm />
    </main>
  );
}
