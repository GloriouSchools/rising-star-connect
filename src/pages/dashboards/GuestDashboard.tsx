
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Phone, Mail, Home, Info, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GuestDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'guest') {
      navigate('/');
    }
  }, [navigate]);

  const userName = localStorage.getItem('username') || 'guest_demo';

  const sidebarItems = [
    {
      icon: <Home className="h-4 w-4" />,
      label: 'Welcome',
      onClick: () => setActiveTab('overview'),
      active: activeTab === 'overview'
    },
    {
      icon: <Info className="h-4 w-4" />,
      label: 'School Info',
      onClick: () => setActiveTab('info'),
      active: activeTab === 'info'
    },
    {
      icon: <Calendar className="h-4 w-4" />,
      label: 'Events',
      onClick: () => setActiveTab('events'),
      active: activeTab === 'events'
    },
    {
      icon: <FileText className="h-4 w-4" />,
      label: 'Announcements',
      onClick: () => setActiveTab('announcements'),
      active: activeTab === 'announcements'
    },
    {
      icon: <Phone className="h-4 w-4" />,
      label: 'Contact',
      onClick: () => setActiveTab('contact'),
      active: activeTab === 'contact'
    }
  ];

  const OverviewContent = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Rising Star Junior School</h2>
        <p className="text-gray-600">Explore our school information and upcoming events</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">About Our School</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-800 mb-4">
              Rising Star Junior School is dedicated to providing quality education 
              and fostering the holistic development of young minds. We create a nurturing 
              environment where every child can thrive academically, socially, and personally.
            </p>
            <div className="space-y-2 text-sm text-blue-700">
              <p><strong>Established:</strong> 2010</p>
              <p><strong>Students:</strong> 342</p>
              <p><strong>Teachers:</strong> 28</p>
              <p><strong>Grades:</strong> K-6</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { event: 'School Open Day', date: '2024-06-25', time: '9:00 AM - 3:00 PM' },
              { event: 'Science Fair', date: '2024-06-30', time: '10:00 AM - 2:00 PM' },
              { event: 'Sports Day', date: '2024-07-05', time: '8:00 AM - 4:00 PM' },
              { event: 'Summer Concert', date: '2024-07-10', time: '6:00 PM - 8:00 PM' }
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{item.event}</p>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </div>
                <Badge variant="outline">{item.time}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <h3 className="font-semibold mb-1">Location</h3>
              <p className="text-sm text-gray-600">123 Education Street<br />Learning City, LC 12345</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Phone className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <h3 className="font-semibold mb-1">Phone</h3>
              <p className="text-sm text-gray-600">(555) 123-4567</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Mail className="h-8 w-8 mx-auto mb-2 text-orange-600" />
              <h3 className="font-semibold mb-1">Email</h3>
              <p className="text-sm text-gray-600">info@risingstar.edu</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewContent />;
      case 'info':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">School Information</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    To provide a comprehensive, nurturing educational environment that empowers 
                    students to achieve academic excellence, develop critical thinking skills, 
                    and become responsible global citizens.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>School Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><strong>Monday - Friday:</strong> 8:00 AM - 3:00 PM</p>
                    <p><strong>Office Hours:</strong> 7:30 AM - 4:00 PM</p>
                    <p><strong>After School Care:</strong> 3:00 PM - 6:00 PM</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      default:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-500">This section contains public information about the school.</p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <DashboardLayout
      userRole="guest"
      userName={userName}
      sidebarItems={sidebarItems}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default GuestDashboard;
