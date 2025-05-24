"use client";
import { LoginForm } from "@/components/auth/login-form";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || isAuthenticated) {
     // Or a more sophisticated loading screen
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="animate-pulse rounded-full bg-primary/50 h-12 w-12"></div>
        </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-background to-blue-100 dark:from-background dark:to-blue-900">
      <LoginForm />
    </main>
  );
}
