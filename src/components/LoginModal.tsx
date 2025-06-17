
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff, GraduationCap } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
  role: string;
  onClose: () => void;
}

const LoginModal = ({ role, onClose }: LoginModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const roleDisplayNames: { [key: string]: string } = {
    'parent': 'Parent',
    'pupil': 'Pupil',
    'teacher': 'Teacher',
    'non-teaching-staff': 'Non-Teaching Staff',
    'guest': 'Guest',
    'admin': 'Admin'
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      if (credentials.username && credentials.password) {
        toast({
          title: "Login Successful",
          description: `Welcome to your ${roleDisplayNames[role]} dashboard!`,
        });
        
        // Store user session
        localStorage.setItem('userRole', role);
        localStorage.setItem('username', credentials.username);
        
        // Navigate to role-specific dashboard
        navigate(`/dashboard/${role}`);
        onClose();
      } else {
        toast({
          title: "Login Failed",
          description: "Please enter both username and password.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const getDemoCredentials = () => {
    const demoCredentials: { [key: string]: { username: string; password: string } } = {
      'parent': { username: 'parent_demo', password: 'demo123' },
      'pupil': { username: 'pupil_demo', password: 'demo123' },
      'teacher': { username: 'teacher_demo', password: 'demo123' },
      'non-teaching-staff': { username: 'staff_demo', password: 'demo123' },
      'guest': { username: 'guest_demo', password: 'demo123' },
      'admin': { username: 'admin_demo', password: 'demo123' }
    };
    return demoCredentials[role] || { username: 'demo', password: 'demo123' };
  };

  const fillDemoCredentials = () => {
    const demo = getDemoCredentials();
    setCredentials(demo);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl">
            {roleDisplayNames[role]} Login
          </DialogTitle>
          <DialogDescription className="text-center">
            Enter your credentials to access your dashboard
          </DialogDescription>
        </DialogHeader>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    className="w-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700" 
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center mb-2">
                Demo credentials for testing:
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fillDemoCredentials}
                className="w-full text-xs"
              >
                Use Demo Credentials
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
