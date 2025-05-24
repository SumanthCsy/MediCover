"use client";

import { useAuth } from "@/context/auth-context";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircle, Briefcase, Info, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function EmployeeProfilePage() {
  const { employeeDetails } = useAuth();

  if (!employeeDetails) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading employee details...</p>
      </div>
    );
  }
  
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return names[0].substring(0, 2).toUpperCase();
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto shadow-xl overflow-hidden">
        <div className="relative h-48 bg-gradient-to-r from-primary to-accent">
           <Image 
            src="https://placehold.co/800x300.png" 
            alt="Hospital banner" 
            layout="fill" 
            objectFit="cover" 
            data-ai-hint="hospital banner"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
             <Avatar className="h-32 w-32 border-4 border-card shadow-lg">
                <AvatarImage src={`https://placehold.co/128x128.png?text=${getInitials(employeeDetails.name)}`} alt={employeeDetails.name} data-ai-hint="person avatar"/>
                <AvatarFallback className="text-4xl">{getInitials(employeeDetails.name)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <CardHeader className="text-center pt-20 -mt-16 bg-card"> {/* Adjust pt and -mt to position under avatar */}
          <CardTitle className="text-3xl font-bold">{employeeDetails.name}</CardTitle>
          <CardDescription className="text-lg text-accent">{employeeDetails.role}</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoItem icon={UserCircle} label="Employee ID" value={employeeDetails.id} />
            <InfoItem icon={Briefcase} label="Department" value="Patient Services & Analytics" />
            <InfoItem icon={ShieldCheck} label="Access Level" value="Standard Employee" />
            <InfoItem icon={Info} label="Status" value="Active" />
          </div>
          <div className="mt-6 p-4 bg-secondary/30 rounded-lg border border-secondary">
            <h3 className="text-md font-semibold mb-2 text-primary flex items-center">
              <Info className="w-5 h-5 mr-2" /> About
            </h3>
            <p className="text-sm text-foreground/80">
              {employeeDetails.name} is a dedicated {employeeDetails.role} at MediCentral, committed to providing excellent service and ensuring accurate data management for optimal patient care.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg shadow-sm">
      <Icon className="h-6 w-6 text-primary mt-1" />
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-md font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}
