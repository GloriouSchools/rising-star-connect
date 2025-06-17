
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Calendar, Trophy, Users, FileText, Home, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PupilDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'pupil') {
      navigate('/');
    }
  }, [navigate]);

  const userName = localStorage.getItem('username') || 'pupil_demo';

  const sidebarItems = [
    {
      icon: <Home className="h-4 w-4" />,
      label: 'Dashboard',
      onClick: () => setActiveTab('overview'),
      active: activeTab === 'overview'
    },
    {
      icon: <BookOpen className="h-4 w-4" />,
      label: 'My Subjects',
      onClick: () => setActiveTab('subjects'),
      active: activeTab === 'subjects'
    },
    {
      icon: <FileText className="h-4 w-4" />,
      label: 'Assignments',
      onClick: () => setActiveTab('assignments'),
      active: activeTab === 'assignments'
    },
    {
      icon: <Trophy className="h-4 w-4" />,
      label: 'Achievements',
      onClick: () => setActiveTab('achievements'),
      active: activeTab === 'achievements'
    },
    {
      icon: <Calendar className="h-4 w-4" />,
      label: 'Schedule',
      onClick: () => setActiveTab('schedule'),
      active: activeTab === 'schedule'
    },
    {
      icon: <Users className="h-4 w-4" />,
      label: 'Classmates',
      onClick: () => setActiveTab('classmates'),
      active: activeTab === 'classmates'
    }
  ];

  const OverviewContent = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, Student!</h2>
        <p className="text-gray-600">Ready to learn something new today?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Current Grade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">B+</div>
            <p className="text-xs text-green-600 mt-1">Keep it up!</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Assignments Due</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">3</div>
            <p className="text-xs text-blue-600 mt-1">This week</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">12</div>
            <p className="text-xs text-purple-600 mt-1">Earned</p>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">96%</div>
            <p className="text-xs text-orange-600 mt-1">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { subject: 'Mathematics', time: '09:00 - 09:45', teacher: 'Mr. Johnson' },
              { subject: 'English', time: '10:00 - 10:45', teacher: 'Mrs. Davis' },
              { subject: 'Science', time: '11:00 - 11:45', teacher: 'Dr. Wilson' },
              { subject: 'Art', time: '14:00 - 14:45', teacher: 'Ms. Brown' }
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{item.subject}</p>
                  <p className="text-sm text-gray-500">{item.teacher}</p>
                </div>
                <Badge variant="outline">{item.time}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Assignments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { title: 'Math Problem Set 5', subject: 'Mathematics', due: '2024-06-20', status: 'pending' },
              { title: 'Essay on Climate Change', subject: 'English', due: '2024-06-22', status: 'pending' },
              { title: 'Science Project', subject: 'Science', due: '2024-06-18', status: 'submitted' },
              { title: 'Art Portfolio', subject: 'Art', due: '2024-06-25', status: 'pending' }
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.subject} • Due: {item.due}</p>
                </div>
                <Badge variant={item.status === 'submitted' ? 'default' : 'secondary'}>
                  {item.status}
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
      case 'subjects':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Subjects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['Mathematics', 'English', 'Science', 'Social Studies', 'Art', 'Physical Education'].map((subject, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{subject}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{Math.floor(Math.random() * 30) + 70}%</span>
                      </div>
                      <Progress value={Math.floor(Math.random() * 30) + 70} className="h-2" />
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
      userRole="pupil"
      userName={userName}
      sidebarItems={sidebarItems}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default PupilDashboard;
