
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, BookOpen, DollarSign, TrendingUp, Settings, Shield, Home, BarChart3, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin') {
      navigate('/');
    }
  }, [navigate]);

  const userName = localStorage.getItem('username') || 'admin_demo';

  const sidebarItems = [
    {
      icon: <Home className="h-4 w-4" />,
      label: 'Dashboard',
      onClick: () => setActiveTab('overview'),
      active: activeTab === 'overview'
    },
    {
      icon: <Users className="h-4 w-4" />,
      label: 'User Management',
      onClick: () => setActiveTab('users'),
      active: activeTab === 'users'
    },
    {
      icon: <BarChart3 className="h-4 w-4" />,
      label: 'Analytics',
      onClick: () => setActiveTab('analytics'),
      active: activeTab === 'analytics'
    },
    {
      icon: <BookOpen className="h-4 w-4" />,
      label: 'Academic Management',
      onClick: () => setActiveTab('academic'),
      active: activeTab === 'academic'
    },
    {
      icon: <DollarSign className="h-4 w-4" />,
      label: 'Financial',
      onClick: () => setActiveTab('financial'),
      active: activeTab === 'financial'
    },
    {
      icon: <Settings className="h-4 w-4" />,
      label: 'System Settings',
      onClick: () => setActiveTab('settings'),
      active: activeTab === 'settings'
    }
  ];

  const OverviewContent = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Administrator Dashboard</h2>
        <p className="text-gray-600">Complete system overview and management controls</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">342</div>
            <p className="text-xs text-blue-600 mt-1">+12 this month</p>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Total Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">45</div>
            <p className="text-xs text-green-600 mt-1">28 Teachers, 17 Staff</p>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Revenue (Monthly)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">$48,500</div>
            <p className="text-xs text-orange-600 mt-1">+5.2% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">98.5%</div>
            <p className="text-xs text-purple-600 mt-1">Uptime this month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { role: 'Students', count: 342, percentage: 76 },
              { role: 'Parents', count: 298, percentage: 66 },
              { role: 'Teachers', count: 28, percentage: 6 },
              { role: 'Staff', count: 17, percentage: 4 },
              { role: 'Guests', count: 156, percentage: 35 }
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{item.role}</span>
                  <span>{item.count}</span>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { activity: 'New student enrollment', user: 'Sarah Johnson', time: '2 hours ago', type: 'success' },
              { activity: 'System backup completed', user: 'System', time: '4 hours ago', type: 'info' },
              { activity: 'Teacher account created', user: 'John Smith', time: '6 hours ago', type: 'success' },
              { activity: 'Payment received', user: 'Mary Davis', time: '1 day ago', type: 'success' },
              { activity: 'Grade submission', user: 'Dr. Wilson', time: '1 day ago', type: 'info' }
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{item.activity}</p>
                  <p className="text-sm text-gray-500">{item.user} • {item.time}</p>
                </div>
                <Badge variant={item.type === 'success' ? 'default' : 'secondary'}>
                  {item.type}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
              <CardContent className="p-4 text-center">
                <UserCheck className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <p className="text-sm font-medium">Manage Users</p>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
              <CardContent className="p-4 text-center">
                <BarChart3 className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <p className="text-sm font-medium">View Reports</p>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
              <CardContent className="p-4 text-center">
                <Settings className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <p className="text-sm font-medium">System Settings</p>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
              <CardContent className="p-4 text-center">
                <Shield className="h-8 w-8 mx-auto mb-2 text-red-600" />
                <p className="text-sm font-medium">Security</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
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
                <p className="text-gray-500">Administrative tools and controls will be available here.</p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <DashboardLayout
      userRole="admin"
      userName={userName}
      sidebarItems={sidebarItems}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default AdminDashboard;
