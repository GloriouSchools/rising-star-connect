
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MessageSquare } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const ContactSection: React.FC = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent successfully",
      description: "Thank you for contacting us. We'll respond soon.",
    });
    setContactForm({
      name: '',
      email: '',
      message: ''
    });
  };

  const handlePhoneCall = () => {
    window.open('tel:+256123456789', '_self');
  };

  const handleEmailClick = () => {
    window.open('mailto:support@school.edu', '_self');
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hello Springing Stars admin');
    window.open(`https://wa.me/256123456789?text=${message}`, '_blank');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Send us a Message</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                value={contactForm.name}
                onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                placeholder="Your full name"
                required
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                placeholder="your.email@example.com"
                required
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Message</label>
              <Textarea
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                placeholder="How can we help you?"
                rows={5}
                required
              />
            </div>
            
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors" onClick={handlePhoneCall}>
            <Phone className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium">Phone Support</p>
              <p className="text-sm text-gray-600">+256 123 456 789</p>
              <p className="text-xs text-gray-500">Mon-Fri 8AM-6PM</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors" onClick={handleEmailClick}>
            <Mail className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium">Email Support</p>
              <p className="text-sm text-gray-600">support@school.edu</p>
              <p className="text-xs text-gray-500">Response within 24 hours</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors" onClick={handleWhatsAppClick}>
            <MessageSquare className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium">WhatsApp Support</p>
              <p className="text-sm text-gray-600">+256 123 456 789</p>
              <p className="text-xs text-gray-500">Quick responses via WhatsApp</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
