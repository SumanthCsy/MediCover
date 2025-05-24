// src/app/actions/email-actions.ts
'use server';

// This is a mock. In a real scenario, you would import and use actual AI flows.
// For example: import { generateSubject } from '@/ai/flows/emailSubjectGenerator';

export async function generateAiSubjectAction(emailBody: string): Promise<{ subject?: string; error?: string }> {
  if (!emailBody || emailBody.trim().length < 10) {
    return { error: 'Email body is too short for subject generation (min 10 chars).' };
  }

  try {
    // const aiGeneratedSubject = await generateSubject({ emailBody }); // Assuming such a flow exists
    // Mocking the AI call
    await new Promise(resolve => setTimeout(resolve, 700)); 
    
    // Simple mock logic: take first few words
    const words = emailBody.trim().split(/\s+/);
    const subjectHint = words.slice(0, 5).join(" ");
    const mockSubject = `AI Suggestion: Update on ${subjectHint}...`;
    
    return { subject: mockSubject };
  } catch (e) {
    console.error("Error generating AI subject:", e);
    return { error: 'Failed to generate AI subject due to an internal error.' };
  }
}

export async function sendEmailAction(to: string, subject: string, body: string, recipientType: 'customer' | 'headOffice'): Promise<{ success?: boolean; message: string }> {
  // Basic validation
  if (!to || !subject || !body) {
    return { success: false, message: "To, Subject, and Body fields are required." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    return { success: false, message: "Invalid email address format for 'To' field." };
  }

  console.log(`Simulating email send to ${recipientType}:`);
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body: ${body}`);
  
  // Simulate API call or email sending logic
  await new Promise(resolve => setTimeout(resolve, 1000));

  // In a real app, you'd use an email service (e.g., SendGrid, AWS SES)
  return { success: true, message: `Email successfully sent to ${to} (${recipientType}).` };
}
