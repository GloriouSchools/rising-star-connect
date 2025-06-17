
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, BookOpen, TrendingUp, MessageCircle, FileText, Home, User, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ParentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'parent') {
      navigate('/');
    }
  }, [navigate]);

  const userName = localStorage.getItem('username') || 'parent_demo';

  const sidebarItems = [
    {
      icon: <Home className="h-4 w-4" />,
      label: 'Overview',
      onClick: () => setActiveTab('overview'),
      active: activeTab === 'overview'
    },
    {
      icon: <User className="h-4 w-4" />,
      label: 'Child Profile',
      onClick: () => setActiveTab('profile'),
      active: activeTab === 'profile'
    },
    {
      icon: <TrendingUp className="h-4 w-4" />,
      label: 'Academic Progress',
      onClick: () => setActiveTab('progress'),
      active: activeTab === 'progress'
    },
    {
      icon: <Calendar className="h-4 w-4" />,
      label: 'Attendance',
      onClick: () => setActiveTab('attendance'),
      active: activeTab === 'attendance'
    },
    {
      icon: <MessageCircle className="h-4 w-4" />,
      label: 'Messages',
      onClick: () => setActiveTab('messages'),
      active: activeTab === 'messages'
    },
    {
      icon: <Bell className="h-4 w-4" />,
      label: 'Notifications',
      onClick: () => setActiveTab('notifications'),
      active: activeTab === 'notifications'
    }
  ];

  const OverviewContent = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, Parent!</h2>
        <p className="text-gray-600">Here's an overview of your child's school activities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">96%</div>
            <p className="text-xs text-blue-600 mt-1">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Average Grade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">B+</div>
            <p className="text-xs text-green-600 mt-1">Current term</p>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">3</div>
            <p className="text-xs text-orange-600 mt-1">Pending</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">2</div>
            <p className="text-xs text-purple-600 mt-1">Unread</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>Recent Grades</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { subject: 'Mathematics', grade: 'A-', date: '2024-06-15' },
              { subject: 'English', grade: 'B+', date: '2024-06-14' },
              { subject: 'Science', grade: 'A', date: '2024-06-13' },
              { subject: 'Art', grade: 'B', date: '2024-06-12' }
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{item.subject}</p>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </div>
                <Badge variant={item.grade.startsWith('A') ? 'default' : 'secondary'}>
                  {item.grade}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Upcoming Events</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { event: 'Parent-Teacher Conference', date: '2024-06-20', time: '2:00 PM' },
              { event: 'Science Fair', date: '2024-06-25', time: '10:00 AM' },
              { event: 'Sports Day', date: '2024-06-30', time: '9:00 AM' },
              { event: 'End of Term Assembly', date: '2024-07-05', time: '11:00 AM' }
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{item.event}</p>
                  <p className="text-sm text-gray-500">{item.date} at {item.time}</p>
                </div>
                <Badge variant="outline">Upcoming</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const ProfileContent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Child Profile</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Student Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">Full Name</label>
              <p className="text-lg">Sarah Johnson</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">Class</label>
              <p className="text-lg">Grade 5A</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">Student ID</label>
              <p className="text-lg">RSJ2024001</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">Date of Birth</label>
              <p className="text-lg">March 15, 2014</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">House</label>
              <p className="text-lg">Blue House</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">Class Teacher</label>
              <p className="text-lg">Mrs. Smith</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const ProgressContent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Academic Progress</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[
          { subject: 'Mathematics', progress: 85, grade: 'A-' },
          { subject: 'English', progress: 78, grade: 'B+' },
          { subject: 'Science', progress: 92, grade: 'A' },
          { subject: 'Social Studies', progress: 80, grade: 'B+' },
          { subject: 'Art', progress: 70, grade: 'B' },
          { subject: 'Physical Education', progress: 88, grade: 'A-' }
        ].map((item, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">{item.subject}</CardTitle>
                <Badge variant={item.grade.startsWith('A') ? 'default' : 'secondary'}>
                  {item.grade}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{item.progress}%</span>
                </div>
                <Progress value={item.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewContent />;
      case 'profile':
        return <ProfileContent />;
      case 'progress':
        return <ProgressContent />;
      case 'attendance':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Attendance Records</h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-500">Attendance tracking features will be available here.</p>
              </CardContent>
            </Card>
          </div>
        );
      case 'messages':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Messages</h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-500">Communication with teachers and school administration.</p>
              </CardContent>
            </Card>
          </div>
        );
      case 'notifications':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Notifications</h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-500">School announcements and important updates.</p>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return <OverviewContent />;
    }
  };

  return (
    <DashboardLayout
      userRole="parent"
      userName={userName}
      sidebarItems={sidebarItems}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default ParentDashboard;
