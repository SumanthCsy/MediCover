"use client";
import { LoginForm } from "@/components/auth/login-form";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Building } from "lucide-react"; // Changed from Hospital for a more generic "portal" feel

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
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <div className="text-center mb-8">
        <Building className="w-20 h-20 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-foreground">Welcome to Medicover Hospitals</h1>
        <p className="text-xl text-muted-foreground mt-2">Login to Medicentral Portal</p>
      </div>
      <LoginForm />
    </main>
  );
}
