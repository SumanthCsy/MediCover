"use client";

import { useAuth } from "@/context/auth-context";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UserCircle, Briefcase, Info, ShieldCheck, Mail, CheckCircle2, Clock, BarChart3 } from "lucide-react";

export default function EmployeeProfilePage() {
  const { employeeDetails } = useAuth();

  if (!employeeDetails) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse rounded-full bg-primary/50 h-10 w-10 mr-3"></div>
        <p>Loading employee details...</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 space-y-8">
      <Card className="max-w-2xl mx-auto shadow-lg overflow-hidden">
        <CardHeader className="text-center py-6 bg-card border-b">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Mails Sent</CardTitle>
            <Mail className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">600</div>
            <p className="text-xs text-muted-foreground">Cumulative count of all emails</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful Mails</CardTitle>
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">580</div>
            <p className="text-xs text-muted-foreground">+96.7% success rate</p>
          </CardContent>
        </Card>
        <Card className="shadow-md md:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mail Service Status</CardTitle>
            <Clock className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-md font-semibold text-primary">Operational Hours</div>
            <p className="text-sm text-foreground/90">
              8:00 PM - 3:00 AM
            </p>
            <p className="text-xs text-muted-foreground">On all working days.</p>
          </CardContent>
        </Card>
      </div>
       {/* Placeholder for future charts or more stats */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-6 w-6 mr-2 text-primary" />
            Portal Activity Overview
          </CardTitle>
          <CardDescription>Summary of key portal metrics (coming soon).</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-40 flex items-center justify-center text-muted-foreground">
            <p>Chart data and additional statistics will be displayed here.</p>
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
    <div className="flex items-start space-x-3 p-3 bg-card rounded-lg shadow-sm border">
      <Icon className="h-6 w-6 text-primary mt-1" />
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-md font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}
