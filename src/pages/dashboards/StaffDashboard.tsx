
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, Calendar, Phone, Home, ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StaffDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'non-teaching-staff') {
      navigate('/');
    }
  }, [navigate]);

  const userName = localStorage.getItem('username') || 'staff_demo';

  const sidebarItems = [
    {
      icon: <Home className="h-4 w-4" />,
      label: 'Dashboard',
      onClick: () => setActiveTab('overview'),
      active: activeTab === 'overview'
    },
    {
      icon: <Users className="h-4 w-4" />,
      label: 'Student Records',
      onClick: () => setActiveTab('records'),
      active: activeTab === 'records'
    },
    {
      icon: <ClipboardList className="h-4 w-4" />,
      label: 'Tasks',
      onClick: () => setActiveTab('tasks'),
      active: activeTab === 'tasks'
    },
    {
      icon: <Calendar className="h-4 w-4" />,
      label: 'Schedule',
      onClick: () => setActiveTab('schedule'),
      active: activeTab === 'schedule'
    },
    {
      icon: <FileText className="h-4 w-4" />,
      label: 'Reports',
      onClick: () => setActiveTab('reports'),
      active: activeTab === 'reports'
    },
    {
      icon: <Phone className="h-4 w-4" />,
      label: 'Contacts',
      onClick: () => setActiveTab('contacts'),
      active: activeTab === 'contacts'
    }
  ];

  const OverviewContent = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Staff Dashboard</h2>
        <p className="text-gray-600">Administrative overview and daily tasks</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">342</div>
            <p className="text-xs text-blue-600 mt-1">Enrolled</p>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">12</div>
            <p className="text-xs text-green-600 mt-1">Due today</p>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">New Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">8</div>
            <p className="text-xs text-orange-600 mt-1">This week</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Reports Due</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">3</div>
            <p className="text-xs text-purple-600 mt-1">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { task: 'Update student records', priority: 'High', due: '10:00 AM' },
              { task: 'Process enrollment applications', priority: 'Medium', due: '2:00 PM' },
              { task: 'Prepare attendance report', priority: 'Low', due: '4:00 PM' },
              { task: 'Contact parent - follow up', priority: 'High', due: '5:00 PM' }
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{item.task}</p>
                  <p className="text-sm text-gray-500">Due: {item.due}</p>
                </div>
                <Badge variant={item.priority === 'High' ? 'destructive' : item.priority === 'Medium' ? 'default' : 'secondary'}>
                  {item.priority}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-sm font-medium">Student Records</p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                <CardContent className="p-4 text-center">
                  <FileText className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="text-sm font-medium">Generate Report</p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                <CardContent className="p-4 text-center">
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <p className="text-sm font-medium">Schedule Event</p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                <CardContent className="p-4 text-center">
                  <Phone className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <p className="text-sm font-medium">Contact Parents</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewContent />;
      default:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-500">This section is under development.</p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <DashboardLayout
      userRole="non-teaching-staff"
      userName={userName}
      sidebarItems={sidebarItems}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default StaffDashboard;
