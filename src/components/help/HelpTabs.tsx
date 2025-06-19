
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FAQSection } from './FAQSection';
import { SupportTicketsSection } from './SupportTicketsSection';
import { ContactSection } from './ContactSection';
import { ResourcesSection } from './ResourcesSection';

export const HelpTabs: React.FC = () => {
  return (
    <Tabs defaultValue="faq" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="faq">FAQ</TabsTrigger>
        <TabsTrigger value="support">Support Tickets</TabsTrigger>
        <TabsTrigger value="contact">Contact Us</TabsTrigger>
        <TabsTrigger value="resources">Resources</TabsTrigger>
      </TabsList>

      <TabsContent value="faq">
        <FAQSection />
      </TabsContent>

      <TabsContent value="support">
        <SupportTicketsSection />
      </TabsContent>

      <TabsContent value="contact">
        <ContactSection />
      </TabsContent>

      <TabsContent value="resources">
        <ResourcesSection />
      </TabsContent>
    </Tabs>
  );
};
