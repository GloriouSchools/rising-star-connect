
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video, FileText, Users, Lightbulb, Settings, AlertCircle } from 'lucide-react';

export const ResourcesSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6 text-center">
          <Video className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Video Tutorials</h3>
          <p className="text-sm text-gray-600 mb-4">Step-by-step video guides</p>
          <Button variant="outline" size="sm">
            Watch Now
          </Button>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6 text-center">
          <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="font-semibold mb-2">User Manual</h3>
          <p className="text-sm text-gray-600 mb-4">Comprehensive documentation</p>
          <Button variant="outline" size="sm">
            Download PDF
          </Button>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6 text-center">
          <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Community Forum</h3>
          <p className="text-sm text-gray-600 mb-4">Connect with other users</p>
          <Button variant="outline" size="sm">
            Join Forum
          </Button>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6 text-center">
          <Lightbulb className="h-12 w-12 text-orange-600 mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Tips & Tricks</h3>
          <p className="text-sm text-gray-600 mb-4">Get the most out of the system</p>
          <Button variant="outline" size="sm">
            Learn More
          </Button>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6 text-center">
          <Settings className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h3 className="font-semibold mb-2">System Status</h3>
          <p className="text-sm text-gray-600 mb-4">Check service availability</p>
          <Button variant="outline" size="sm">
            View Status
          </Button>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6 text-center">
          <AlertCircle className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Known Issues</h3>
          <p className="text-sm text-gray-600 mb-4">Current system limitations</p>
          <Button variant="outline" size="sm">
            View Issues
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
