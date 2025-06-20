
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Video, FileText, Users, Lightbulb, Settings, AlertCircle, Download, ExternalLink, BookOpen } from 'lucide-react';

const resources = [
  {
    title: "Video Tutorials",
    description: "Step-by-step video guides for common tasks",
    icon: <Video className="h-8 w-8 text-blue-600" />,
    color: "bg-blue-50 border-blue-200",
    items: [
      { name: "Getting Started Guide", duration: "5 min", url: "#" },
      { name: "Using the Grade Book", duration: "8 min", url: "#" },
      { name: "Submitting Assignments", duration: "6 min", url: "#" },
      { name: "Parent Portal Overview", duration: "10 min", url: "#" }
    ],
    action: "Watch Tutorials"
  },
  {
    title: "Downloadable Guides",
    description: "Comprehensive PDF documentation",
    icon: <FileText className="h-8 w-8 text-green-600" />,
    color: "bg-green-50 border-green-200",
    items: [
      { name: "Student Handbook", size: "2.3 MB", url: "#" },
      { name: "Parent Guide", size: "1.8 MB", url: "#" },
      { name: "Teacher Manual", size: "4.1 MB", url: "#" },
      { name: "Quick Reference Card", size: "0.5 MB", url: "#" }
    ],
    action: "Download PDFs"
  },
  {
    title: "Community Forum",
    description: "Connect with other users and share experiences",
    icon: <Users className="h-8 w-8 text-purple-600" />,
    color: "bg-purple-50 border-purple-200",
    items: [
      { name: "General Discussion", members: "2,456 members", url: "#" },
      { name: "Student Help", members: "1,234 members", url: "#" },
      { name: "Parent Corner", members: "987 members", url: "#" },
      { name: "Tech Support", members: "456 members", url: "#" }
    ],
    action: "Join Community"
  },
  {
    title: "Tips & Best Practices",
    description: "Expert advice to maximize your success",
    icon: <Lightbulb className="h-8 w-8 text-orange-600" />,
    color: "bg-orange-50 border-orange-200",
    items: [
      { name: "Study Organization Tips", category: "Academic" },
      { name: "Effective Communication", category: "Social" },
      { name: "Time Management", category: "Personal" },
      { name: "Goal Setting Strategies", category: "Motivation" }
    ],
    action: "Read Tips"
  },
  {
    title: "System Status",
    description: "Real-time service availability and updates",
    icon: <Settings className="h-8 w-8 text-blue-600" />,
    color: "bg-blue-50 border-blue-200",
    items: [
      { name: "All Systems Operational", status: "online", updated: "2 min ago" },
      { name: "Grade Sync Service", status: "online", updated: "5 min ago" },
      { name: "Email Notifications", status: "online", updated: "10 min ago" },
      { name: "Mobile App", status: "maintenance", updated: "1 hour ago" }
    ],
    action: "View Details"
  },
  {
    title: "Known Issues & Updates",
    description: "Current limitations and upcoming features",
    icon: <AlertCircle className="h-8 w-8 text-yellow-600" />,
    color: "bg-yellow-50 border-yellow-200",
    items: [
      { name: "Mobile app slow loading", severity: "low", eta: "Next week" },
      { name: "Grade export formatting", severity: "medium", eta: "2 days" },
      { name: "Calendar sync delay", severity: "low", eta: "Tomorrow" },
      { name: "New messaging features", severity: "enhancement", eta: "Next month" }
    ],
    action: "View All Issues"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'online': return 'bg-green-100 text-green-800';
    case 'maintenance': return 'bg-yellow-100 text-yellow-800';
    case 'offline': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high': return 'bg-red-100 text-red-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'low': return 'bg-green-100 text-green-800';
    case 'enhancement': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const ResourcesSection: React.FC = () => {
  const handleResourceClick = (title: string) => {
    // Simulate opening resource - in real app this would navigate or open modals
    console.log(`Opening ${title} resource`);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Learning Resources</h2>
        <p className="text-gray-600">
          Everything you need to master the Springing Stars platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <Card key={index} className={`hover:shadow-lg transition-all duration-200 ${resource.color}`}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-center mb-3">
                {resource.icon}
              </div>
              <CardTitle className="text-center text-lg">{resource.title}</CardTitle>
              <p className="text-sm text-gray-600 text-center">{resource.description}</p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {resource.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between p-2 bg-white rounded-lg border">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {item.duration && (
                          <Badge variant="outline" className="text-xs">
                            {item.duration}
                          </Badge>
                        )}
                        {item.size && (
                          <Badge variant="outline" className="text-xs">
                            {item.size}
                          </Badge>
                        )}
                        {item.members && (
                          <Badge variant="outline" className="text-xs">
                            {item.members}
                          </Badge>
                        )}
                        {item.category && (
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                        )}
                        {item.status && (
                          <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                            {item.status}
                          </Badge>
                        )}
                        {item.severity && (
                          <Badge className={`text-xs ${getSeverityColor(item.severity)}`}>
                            {item.severity}
                          </Badge>
                        )}
                      </div>
                      {(item.updated || item.eta) && (
                        <p className="text-xs text-gray-500 mt-1">
                          {item.updated && `Updated ${item.updated}`}
                          {item.eta && `ETA: ${item.eta}`}
                        </p>
                      )}
                    </div>
                    {(item.url || item.status === 'online') && (
                      <Button variant="ghost" size="sm">
                        {resource.title === "Downloadable Guides" ? (
                          <Download className="h-4 w-4" />
                        ) : (
                          <ExternalLink className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => handleResourceClick(resource.title)}
              >
                {resource.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6 text-center">
          <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Can't Find What You Need?</h3>
          <p className="text-gray-600 mb-4">
            Our comprehensive help center is constantly growing. If you can't find the resource you need, 
            please let us know and we'll prioritize creating it.
          </p>
          <div className="flex justify-center gap-3">
            <Button variant="outline">
              Request Resource
            </Button>
            <Button>
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
