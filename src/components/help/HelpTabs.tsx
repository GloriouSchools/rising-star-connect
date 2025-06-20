
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FAQSection } from './FAQSection';
import { UserGuideSection } from './UserGuideSection';
import { ResourcesSection } from './ResourcesSection';

export const HelpTabs: React.FC = () => {
  return (
    <Tabs defaultValue="faq" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="faq">FAQ</TabsTrigger>
        <TabsTrigger value="guide">User Guide</TabsTrigger>
        <TabsTrigger value="resources">Resources</TabsTrigger>
      </TabsList>

      <TabsContent value="faq">
        <FAQSection />
      </TabsContent>

      <TabsContent value="guide">
        <UserGuideSection />
      </TabsContent>

      <TabsContent value="resources">
        <ResourcesSection />
      </TabsContent>
    </Tabs>
  );
};
