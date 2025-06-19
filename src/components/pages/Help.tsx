
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { LiveChat } from '@/components/help/LiveChat';
import { ContactActions } from '@/components/help/ContactActions';
import { HelpTabs } from '@/components/help/HelpTabs';
import { Clock } from 'lucide-react';

export const Help = () => {
  const { user } = useAuth();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handlePhoneCall = () => {
    window.open('tel:+256123456789', '_self');
  };

  const handleEmailClick = () => {
    window.open('mailto:support@school.edu', '_self');
  };

  const handleLiveChatClick = () => {
    setIsChatOpen(true);
  };

  return (
    <div className="space-y-6 p-1">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Help & Support</h1>
          <p className="text-gray-600 mt-2">Get help, find answers, and contact support</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Clock className="h-3 w-3 mr-1" />
            Available 24/7
          </Badge>
        </div>
      </div>

      {/* Quick Actions */}
      <ContactActions 
        onLiveChatClick={handleLiveChatClick}
        onPhoneCall={handlePhoneCall}
        onEmailClick={handleEmailClick}
      />

      {/* Main Content Tabs */}
      <HelpTabs />

      {/* Live Chat Component */}
      <LiveChat 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </div>
  );
};
