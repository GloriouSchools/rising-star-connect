
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, BookOpen, Shield, UserCheck, Heart } from 'lucide-react';
import LoginModal from '@/components/LoginModal';

const Index = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  const userRoles = [
    {
      id: 'parent',
      title: 'Parents',
      description: 'Access your child\'s progress, attendance, and school communications',
      icon: Heart,
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200'
    },
    {
      id: 'pupil',
      title: 'Pupils',
      description: 'View your assignments, grades, and school schedule',
      icon: GraduationCap,
      color: 'bg-green-50 hover:bg-green-100 border-green-200'
    },
    {
      id: 'teacher',
      title: 'Teachers',
      description: 'Manage classes, grades, and student assessments',
      icon: BookOpen,
      color: 'bg-purple-50 hover:bg-purple-100 border-purple-200'
    },
    {
      id: 'non-teaching-staff',
      title: 'Non-Teaching Staff',
      description: 'Access administrative tools and student records',
      icon: Users,
      color: 'bg-orange-50 hover:bg-orange-100 border-orange-200'
    },
    {
      id: 'guest',
      title: 'Guests',
      description: 'View public information and school announcements',
      icon: UserCheck,
      color: 'bg-gray-50 hover:bg-gray-100 border-gray-200'
    },
    {
      id: 'admin',
      title: 'Admin',
      description: 'Full system access and management controls',
      icon: Shield,
      color: 'bg-red-50 hover:bg-red-100 border-red-200'
    }
  ];

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    setShowLogin(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Rising Star Junior School</h1>
                <p className="text-sm text-gray-600">School Management System</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Our School Portal
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please select your role to access your personalized dashboard and school services
          </p>
        </div>

        {/* Role Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {userRoles.map((role) => {
            const IconComponent = role.icon;
            return (
              <Card 
                key={role.id} 
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${role.color}`}
                onClick={() => handleRoleSelect(role.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 bg-white rounded-full shadow-sm">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {role.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 mb-4">
                    {role.description}
                  </CardDescription>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Login as {role.title}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 Rising Star Junior School. All rights reserved.</p>
            <p className="mt-2 text-sm">Empowering young minds for a brighter future</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLogin && selectedRole && (
        <LoginModal
          role={selectedRole}
          onClose={() => {
            setShowLogin(false);
            setSelectedRole(null);
          }}
        />
      )}
    </div>
  );
};

export default Index;
