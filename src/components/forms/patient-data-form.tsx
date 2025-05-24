"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { Save, UserPlus, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const patientSchema = z.object({
  patientName: z.string().min(2, { message: "Patient name must be at least 2 characters." }),
  age: z.coerce.number().int().positive({ message: "Age must be a positive number." }).min(0).max(120),
  gender: z.enum(["Male", "Female", "Other"], { required_error: "Gender is required." }),
  contactNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number format." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  medicalHistory: z.string().optional(),
  currentAilment: z.string().min(3, { message: "Current ailment description is required." }),
  doctorAssigned: z.string().min(2, { message: "Doctor's name must be at least 2 characters." }),
});

type PatientFormValues = z.infer<typeof patientSchema>;

export function PatientDataForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      patientName: "",
      age: undefined,
      gender: undefined,
      contactNumber: "",
      address: "",
      medicalHistory: "",
      currentAilment: "",
      doctorAssigned: "",
    },
  });

  async function onSubmit(data: PatientFormValues) {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Patient Data Submitted:", data);
    toast({
      title: "Success!",
      description: `Patient ${data.patientName} data has been saved.`,
      className: "bg-green-500 text-white dark:bg-green-700", // Example of custom styling for success
    });
    form.reset(); // Reset form after successful submission
    setIsSubmitting(false);
  }

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <UserPlus className="h-8 w-8 text-primary" />
          <div>
            <CardTitle className="text-2xl">New Patient Registration</CardTitle>
            <CardDescription>Fill in the details below to register a new patient.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="patientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patient Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 35" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., +1234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., 123 Main St, Anytown, USA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="medicalHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medical History (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Allergic to penicillin, Hypertension" {...field} />
                  </FormControl>
                  <FormDescription>Brief summary of past conditions or allergies.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
                control={form.control}
                name="currentAilment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Ailment / Reason for Visit</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Persistent cough and fever for 3 days" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <FormField
              control={form.control}
              name="doctorAssigned"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Doctor Assigned</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Dr. Emily Carter" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" className="min-w-[150px]" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Patient Data
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
