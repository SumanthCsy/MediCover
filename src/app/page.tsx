
"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Building, LogIn, Stethoscope, HeartPulse, ShieldCheck, CalendarDays, Phone } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card shadow-md">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link href="/" className="flex items-center gap-2">
            <Building className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">Medicover Hospitals</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/#contact">
                <Phone className="mr-2 h-4 w-4" /> Contact Us
              </Link>
            </Button>
            <Button asChild>
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" /> Portal Login
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="relative h-[calc(100vh-200px)] min-h-[400px] md:min-h-[500px] flex items-center justify-center text-center bg-secondary/20">
          <Image
            src="/medicover.png" // Updated
            alt="Medicover Hospital Building"
            layout="fill"
            objectFit="cover"
            className="opacity-30"
            priority // Added priority for LCP
          />
          <div className="relative z-10 p-6 rounded-lg max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Welcome to Medicover Hospitals
            </h1>
            <p className="text-lg md:text-xl text-foreground mb-8">
              Providing exceptional healthcare services with compassion and expertise.
            </p>
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/#services">
                Explore Our Services
              </Link>
            </Button>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-12 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-primary mb-10">Our Key Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard
                icon={Stethoscope}
                title="Specialist Consultations"
                description="Access expert advice from our wide range of medical specialists."
                imageSrc="/consult.jpg" // Updated
              />
              <ServiceCard
                icon={HeartPulse}
                title="Advanced Diagnostics"
                description="State-of-the-art technology for accurate and timely diagnosis."
                imageSrc="/diag.jpg" // Updated
              />
              <ServiceCard
                icon={ShieldCheck}
                title="Preventive Health Checks"
                description="Comprehensive health packages to keep you proactive about your wellbeing."
                imageSrc="/health.jpg" // Updated
              />
               <ServiceCard
                icon={CalendarDays}
                title="Book Appointments"
                description="Easily schedule your visits with our doctors online or via phone."
                imageSrc="/appoi.jpg" // Updated
              />
               <ServiceCard
                icon={Building}
                title="Modern Facilities"
                description="Experience care in a comfortable and technologically advanced environment."
                imageSrc="/fac.jpg" // Updated (assuming fac.jpj was fac.jpg)
              />
               <ServiceCard
                icon={Phone}
                title="24/7 Emergency Care"
                description="Our emergency services are available round the clock for critical situations."
                imageSrc="/24.jpg" // Updated
              />
            </div>
          </div>
        </section>
        
        {/* Contact Section Placeholder */}
        <section id="contact" className="py-12 md:py-20 bg-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-primary mb-6">Get In Touch</h2>
            <p className="text-lg text-foreground mb-4">
              Have questions or need assistance? Our team is here to help.
            </p>
            <p className="text-xl font-semibold text-primary">Call Us: +91 XXXX XXX XXX</p>
            <p className="text-md text-muted-foreground">Visit our Karimnagar branch for in-person assistance.</p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-6 text-center">
        <div className="container mx-auto">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Medicover Hospitals. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            This is a representative portal. For official information, please visit <Link href="https://www.medicoverhospitals.in" className="text-primary hover:underline">www.medicoverhospitals.in</Link>.
          </p>
        </div>
      </footer>
    </div>
  );
}

interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  imageSrc: string; // Changed from imageHint to imageSrc
}

function ServiceCard({ icon: Icon, title, description, imageSrc }: ServiceCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="w-full h-40 relative mb-4 rounded-t-md overflow-hidden">
          <Image 
            src={imageSrc} // Updated to use imageSrc
            alt={title} 
            layout="fill" 
            objectFit="cover"
          />
        </div>
        <div className="flex items-center space-x-3">
            <Icon className="h-8 w-8 text-accent" />
            <CardTitle className="text-xl text-primary">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base text-foreground/80">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
