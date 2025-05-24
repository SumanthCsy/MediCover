"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { Send, Sparkles, Loader2, Building } from "lucide-react";

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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { generateAiSubjectAction, sendEmailAction } from "@/app/actions/email-actions";

const emailSchema = z.object({
  to: z.string().email({ message: "Invalid email address." }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters." }),
  body: z.string().min(10, { message: "Email body must be at least 10 characters." }),
});

type EmailFormValues = z.infer<typeof emailSchema>;

const HEAD_OFFICE_EMAIL = "headoffice@medicentral.com"; // Example head office email

export function EmailForm() {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);
  const [isGeneratingSubject, setIsGeneratingSubject] = useState(false);

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      to: "",
      subject: "",
      body: "",
    },
  });

  const handleGenerateSubject = async () => {
    const emailBody = form.getValues("body");
    if (!emailBody || emailBody.trim().length < 10) {
      form.setError("body", { type: "manual", message: "Email body must be at least 10 characters for subject generation." });
      toast({
        variant: "destructive",
        title: "Cannot Generate Subject",
        description: "Email body is too short.",
      });
      return;
    }
    
    setIsGeneratingSubject(true);
    const result = await generateAiSubjectAction(emailBody);
    setIsGeneratingSubject(false);

    if (result.subject) {
      form.setValue("subject", result.subject);
      toast({
        title: "Subject Generated!",
        description: "AI has suggested a subject line.",
      });
    } else if (result.error) {
      toast({
        variant: "destructive",
        title: "Subject Generation Failed",
        description: result.error,
      });
    }
  };

  async function handleSendEmail(recipientType: 'customer' | 'headOffice') {
    const isValid = await form.trigger();
    if (!isValid) {
      toast({ variant: "destructive", title: "Validation Error", description: "Please correct the errors in the form."});
      return;
    }

    const data = form.getValues();
    let finalTo = data.to;
    if (recipientType === 'headOffice') {
      finalTo = HEAD_OFFICE_EMAIL;
      // Optionally update the 'to' field in the form as well, or just use it for sending
      form.setValue('to', HEAD_OFFICE_EMAIL, { shouldValidate: true });
    }
    
    setIsSending(true);
    const result = await sendEmailAction(finalTo, data.subject, data.body, recipientType);
    setIsSending(false);

    if (result.success) {
      toast({
        title: "Email Sent!",
        description: result.message,
        className: "bg-green-500 text-white dark:bg-green-700",
      });
      form.reset(); // Reset form after successful submission
    } else {
      toast({
        variant: "destructive",
        title: "Email Sending Failed",
        description: result.message,
      });
    }
  }

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
         <div className="flex items-center space-x-2">
          <Send className="h-8 w-8 text-primary" />
            <div>
                <CardTitle className="text-2xl">Compose Email</CardTitle>
                <CardDescription>Send emails to customers or head office.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6">
            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>To (Customer Email)</FormLabel>
                  <FormControl>
                    <Input placeholder="Customer Email Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl className="flex-grow">
                      <Input placeholder="Email Subject" {...field} />
                    </FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleGenerateSubject}
                      disabled={isGeneratingSubject}
                      className="whitespace-nowrap"
                    >
                      {isGeneratingSubject ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Sparkles className="mr-2 h-4 w-4 text-yellow-500" />
                      )}
                      AI Subject
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Body</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Compose your email..." {...field} rows={8} />
                  </FormControl>
                  <FormDescription>Compose the main content of your email here.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
              <Button 
                type="button" 
                onClick={() => handleSendEmail('customer')} 
                className="min-w-[180px]" 
                disabled={isSending}
                variant="default"
              >
                {isSending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                Send to Customer
              </Button>
              <Button 
                type="button" 
                onClick={() => handleSendEmail('headOffice')} 
                className="min-w-[180px]" 
                disabled={isSending}
                variant="secondary"
              >
                {isSending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Building className="mr-2 h-4 w-4" />
                )}
                Send to Head Office
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
