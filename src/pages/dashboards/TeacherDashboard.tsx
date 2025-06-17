
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, ClipboardList, Calendar, MessageCircle, Home, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'teacher') {
      navigate('/');
    }
  }, [navigate]);

  const userName = localStorage.getItem('username') || 'teacher_demo';

  const sidebarItems = [
    {
      icon: <Home className="h-4 w-4" />,
      label: 'Dashboard',
      onClick: () => setActiveTab('overview'),
      active: activeTab === 'overview'
    },
    {
      icon: <Users className="h-4 w-4" />,
      label: 'My Classes',
      onClick: () => setActiveTab('classes'),
      active: activeTab === 'classes'
    },
    {
      icon: <ClipboardList className="h-4 w-4" />,
      label: 'Assignments',
      onClick: () => setActiveTab('assignments'),
      active: activeTab === 'assignments'
    },
    {
      icon: <BarChart3 className="h-4 w-4" />,
      label: 'Gradebook',
      onClick: () => setActiveTab('grades'),
      active: activeTab === 'grades'
    },
    {
      icon: <Calendar className="h-4 w-4" />,
      label: 'Schedule',
      onClick: () => setActiveTab('schedule'),
      active: activeTab === 'schedule'
    },
    {
      icon: <MessageCircle className="h-4 w-4" />,
      label: 'Messages',
      onClick: () => setActiveTab('messages'),
      active: activeTab === 'messages'
    }
  ];

  const OverviewContent = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Good morning, Teacher!</h2>
        <p className="text-gray-600">Here's your classroom overview for today</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">128</div>
            <p className="text-xs text-blue-600 mt-1">Across all classes</p>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Classes Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">6</div>
            <p className="text-xs text-green-600 mt-1">Scheduled</p>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Assignments to Grade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">24</div>
            <p className="text-xs text-orange-600 mt-1">Pending review</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">7</div>
            <p className="text-xs text-purple-600 mt-1">Unread</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Classes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { class: 'Grade 5A - Mathematics', time: '09:00 - 09:45', students: 25 },
              { class: 'Grade 5B - Mathematics', time: '10:00 - 10:45', students: 23 },
              { class: 'Grade 4A - Mathematics', time: '11:00 - 11:45', students: 28 },
              { class: 'Grade 6A - Advanced Math', time: '14:00 - 14:45', students: 20 }
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{item.class}</p>
                  <p className="text-sm text-gray-500">{item.students} students</p>
                </div>
                <Badge variant="outline">{item.time}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Student Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { student: 'Emma Johnson', assignment: 'Algebra Quiz', grade: 'A', class: 'Grade 5A' },
              { student: 'Michael Brown', assignment: 'Geometry Test', grade: 'B+', class: 'Grade 5B' },
              { student: 'Sarah Davis', assignment: 'Problem Set 4', grade: 'A-', class: 'Grade 5A' },
              { student: 'James Wilson', assignment: 'Math Project', grade: 'B', class: 'Grade 6A' }
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{item.student}</p>
                  <p className="text-sm text-gray-500">{item.assignment} • {item.class}</p>
                </div>
                <Badge variant={item.grade.startsWith('A') ? 'default' : 'secondary'}>
                  {item.grade}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewContent />;
      case 'classes':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Classes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Grade 5A Mathematics', students: 25, subject: 'Mathematics' },
                { name: 'Grade 5B Mathematics', students: 23, subject: 'Mathematics' },
                { name: 'Grade 4A Mathematics', students: 28, subject: 'Mathematics' },
                { name: 'Grade 6A Advanced Math', students: 20, subject: 'Advanced Mathematics' }
              ].map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">Subject: {item.subject}</p>
                      <p className="text-sm text-gray-600">Students: {item.students}</p>
                      <Badge variant="outline" className="mt-2">Active</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
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
      userRole="teacher"
      userName={userName}
      sidebarItems={sidebarItems}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default TeacherDashboard;
