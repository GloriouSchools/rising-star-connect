
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Video, FileText, Users, Download, ExternalLink, Play } from 'lucide-react';

const resources = [
  {
    title: "Video Tutorials",
    description: "Step-by-step video guides for common tasks",
    icon: <Video className="h-8 w-8 text-blue-600" />,
    color: "bg-blue-50 border-blue-200",
    items: [
      { 
        name: "Getting Started with School Portal", 
        duration: "5:32", 
        videoId: "dQw4w9WgXcQ",
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
      },
      { 
        name: "How to Submit Assignments Online", 
        duration: "8:15", 
        videoId: "dQw4w9WgXcQ",
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
      },
      { 
        name: "Parent Portal Navigation Guide", 
        duration: "6:40", 
        videoId: "dQw4w9WgXcQ",
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
      },
      { 
        name: "Understanding Your Grade Reports", 
        duration: "10:22", 
        videoId: "dQw4w9WgXcQ",
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
      }
    ]
  },
  {
    title: "Downloadable Guides",
    description: "Comprehensive PDF documentation",
    icon: <FileText className="h-8 w-8 text-green-600" />,
    color: "bg-green-50 border-green-200",
    items: [
      { 
        name: "Student Quick Start Guide", 
        size: "2.3 MB", 
        filename: "student-quick-start-guide.pdf"
      },
      { 
        name: "Parent Portal Manual", 
        size: "1.8 MB", 
        filename: "parent-portal-manual.pdf"
      },
      { 
        name: "Teacher Dashboard Guide", 
        size: "4.1 MB", 
        filename: "teacher-dashboard-guide.pdf"
      },
      { 
        name: "Assignment Submission Steps", 
        size: "0.5 MB", 
        filename: "assignment-submission-guide.pdf"
      }
    ]
  },
  {
    title: "Community & Support",
    description: "Connect with our community on WhatsApp",
    icon: <Users className="h-8 w-8 text-green-600" />,
    color: "bg-green-50 border-green-200",
    items: [
      { 
        name: "Parents WhatsApp Group", 
        members: "2,456 members", 
        link: "https://chat.whatsapp.com/parent-group-link",
        description: "Connect with other parents"
      },
      { 
        name: "Students Support Group", 
        members: "1,234 members", 
        link: "https://chat.whatsapp.com/students-group-link",
        description: "Get help from fellow students"
      },
      { 
        name: "Announcements Channel", 
        members: "5,678 subscribers", 
        link: "https://whatsapp.com/channel/announcements-channel",
        description: "Stay updated with school news"
      },
      { 
        name: "Technical Support", 
        members: "Direct support", 
        link: "https://wa.me/256123456789",
        description: "One-on-one technical help"
      }
    ]
  }
];

export const ResourcesSection: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = React.useState<string | null>(null);

  const handleVideoClick = (videoId: string) => {
    setSelectedVideo(videoId);
  };

  const handleDownload = (filename: string, itemName: string) => {
    // Create a dummy PDF blob for demonstration
    const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
72 720 Td
(${itemName}) Tj
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000053 00000 n 
0000000110 00000 n 
0000000279 00000 n 
0000000373 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
459
%%EOF`;
    
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleWhatsAppLink = (link: string) => {
    window.open(link, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Learning Resources</h2>
        <p className="text-gray-600">
          Everything you need to master the Springing Stars platform
        </p>
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setSelectedVideo(null)}>
          <div className="bg-white p-4 rounded-lg max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Video Tutorial</h3>
              <Button variant="ghost" onClick={() => setSelectedVideo(null)}>✕</Button>
            </div>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

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
                  <div key={itemIndex} className="flex items-center justify-between p-3 bg-white rounded-lg border hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {/* Video Tutorial Badges */}
                        {resource.title === "Video Tutorials" && (
                          <Badge variant="outline" className="text-xs">
                            <Play className="h-3 w-3 mr-1" />
                            {item.duration}
                          </Badge>
                        )}
                        {/* Download Badges */}
                        {resource.title === "Downloadable Guides" && (
                          <Badge variant="outline" className="text-xs">
                            <FileText className="h-3 w-3 mr-1" />
                            {item.size}
                          </Badge>
                        )}
                        {/* Community Badges */}
                        {resource.title === "Community & Support" && (
                          <Badge variant="outline" className="text-xs">
                            <Users className="h-3 w-3 mr-1" />
                            {item.members}
                          </Badge>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        if (resource.title === "Video Tutorials" && item.videoId) {
                          handleVideoClick(item.videoId);
                        } else if (resource.title === "Downloadable Guides" && item.filename) {
                          handleDownload(item.filename, item.name);
                        } else if (resource.title === "Community & Support" && item.link) {
                          handleWhatsAppLink(item.link);
                        }
                      }}
                    >
                      {resource.title === "Downloadable Guides" ? (
                        <Download className="h-4 w-4" />
                      ) : resource.title === "Video Tutorials" ? (
                        <Play className="h-4 w-4" />
                      ) : (
                        <ExternalLink className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
