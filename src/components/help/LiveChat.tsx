
import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageSquare, User, Bot, X } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot' | 'options';
  content: string;
  timestamp: Date;
  options?: Array<{
    id: string;
    text: string;
    nextFlow: string;
  }>;
}

interface ChatFlow {
  [key: string]: {
    message: string;
    options?: Array<{
      id: string;
      text: string;
      nextFlow: string;
    }>;
    isEnd?: boolean;
  };
}

const chatFlows: ChatFlow = {
  welcome: {
    message: "Hi there! 👋 I'm Sarah from Springing Stars support. How can I help you today?",
    options: [
      { id: '1', text: '📚 Academic Issues', nextFlow: 'academic' },
      { id: '2', text: '🔐 Account Problems', nextFlow: 'account' },
      { id: '3', text: '💻 Technical Issues', nextFlow: 'technical' },
      { id: '4', text: '💰 Payment/Fees', nextFlow: 'payment' },
      { id: '5', text: '📞 Contact Information', nextFlow: 'contact' }
    ]
  },
  academic: {
    message: "I'd be happy to help with academic matters! What specifically are you having trouble with?",
    options: [
      { id: '1', text: '📊 Can\'t see my grades', nextFlow: 'grades_issue' },
      { id: '2', text: '📝 Assignment submission problems', nextFlow: 'assignment_issue' },
      { id: '3', text: '📅 Timetable questions', nextFlow: 'timetable_issue' },
      { id: '4', text: '👩‍🏫 Teacher communication', nextFlow: 'teacher_contact' }
    ]
  },
  account: {
    message: "I can help you with account-related issues. What seems to be the problem?",
    options: [
      { id: '1', text: '🔑 Forgot my password', nextFlow: 'password_reset' },
      { id: '2', text: '👤 Update profile information', nextFlow: 'profile_update' },
      { id: '3', text: '🚫 Account locked/suspended', nextFlow: 'account_locked' },
      { id: '4', text: '📧 Email not working', nextFlow: 'email_issue' }
    ]
  },
  technical: {
    message: "Technical issues can be frustrating! Let me help you troubleshoot. What's happening?",
    options: [
      { id: '1', text: '🌐 Website not loading properly', nextFlow: 'website_issue' },
      { id: '2', text: '📱 Mobile app problems', nextFlow: 'mobile_issue' },
      { id: '3', text: '🔄 Sync issues between devices', nextFlow: 'sync_issue' },
      { id: '4', text: '💾 File upload problems', nextFlow: 'upload_issue' }
    ]
  },
  payment: {
    message: "I can assist with payment and fee-related questions. How can I help?",
    options: [
      { id: '1', text: '💳 Payment not processing', nextFlow: 'payment_failed' },
      { id: '2', text: '🧾 Need fee receipt/invoice', nextFlow: 'receipt_request' },
      { id: '3', text: '❓ Questions about fee structure', nextFlow: 'fee_structure' },
      { id: '4', text: '📅 Payment plan options', nextFlow: 'payment_plan' }
    ]
  },
  contact: {
    message: "Here are the best ways to reach us:\n\n📞 Phone: +256 123 456 789\n📧 Email: support@school.edu\n💬 WhatsApp: +256 123 456 789\n\nOur support team is available Monday-Friday, 8AM-6PM EAT.",
    isEnd: true
  },
  grades_issue: {
    message: "I understand you can't see your grades. This usually happens when:\n\n• Grades haven't been published yet\n• You're looking in the wrong section\n• There's a temporary sync issue\n\nTry going to 'Results' > 'My Grades' in the sidebar. If you still can't see them, your teacher might not have published them yet.",
    isEnd: true
  },
  assignment_issue: {
    message: "Assignment submission problems are common! Here's what to try:\n\n1. Check the deadline hasn't passed\n2. Ensure your file is under 10MB\n3. Use supported formats (PDF, DOC, DOCX)\n4. Try refreshing the page and submitting again\n\nIf it still doesn't work, please contact your teacher directly.",
    isEnd: true
  },
  password_reset: {
    message: "To reset your password:\n\n1. Go to your Profile page\n2. Click 'Change Password'\n3. Enter your current password\n4. Create a new password\n\nIf you've completely forgotten your password, contact the admin office for a manual reset.",
    isEnd: true
  },
  website_issue: {
    message: "For website loading issues, try these steps:\n\n1. Clear your browser cache and cookies\n2. Try a different browser\n3. Check your internet connection\n4. Disable browser extensions temporarily\n\nIf the problem persists, it might be a server issue on our end.",
    isEnd: true
  },
  payment_failed: {
    message: "Payment processing issues can happen for several reasons:\n\n• Insufficient funds\n• Card expired or blocked\n• Bank security restrictions\n• Network timeout\n\nPlease check with your bank first, then try again. You can also visit the school office to pay in person.",
    isEnd: true
  }
};

interface LiveChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveChat: React.FC<LiveChatProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentFlow, setCurrentFlow] = useState('welcome');
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !hasStarted) {
      setHasStarted(true);
      setMessages([]);
      setCurrentFlow('welcome');
      
      // Simulate initial delay
      setTimeout(() => {
        addBotMessage('welcome');
      }, 1000);
    }
  }, [isOpen, hasStarted]);

  const addBotMessage = (flowKey: string) => {
    const flow = chatFlows[flowKey];
    if (!flow) return;

    setIsTyping(true);
    
    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false);
      
      const newMessage: Message = {
        id: Date.now().toString(),
        type: flow.options ? 'options' : 'bot',
        content: flow.message,
        timestamp: new Date(),
        options: flow.options
      };

      setMessages(prev => [...prev, newMessage]);
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
  };

  const handleOptionClick = (option: { id: string; text: string; nextFlow: string }) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: option.text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentFlow(option.nextFlow);

    // Add bot response after delay
    setTimeout(() => {
      addBotMessage(option.nextFlow);
    }, 500);
  };

  const handleClose = () => {
    setMessages([]);
    setHasStarted(false);
    setIsTyping(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md h-[600px] flex flex-col p-0">
        <DialogHeader className="px-4 py-3 border-b bg-blue-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold">Live Support</DialogTitle>
                <p className="text-sm text-green-600 font-medium">● Online</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div key={message.id}>
              {message.type === 'user' ? (
                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white rounded-lg rounded-br-none px-3 py-2 max-w-[80%]">
                    {message.content}
                  </div>
                </div>
              ) : message.type === 'bot' ? (
                <div className="flex justify-start">
                  <div className="bg-white border rounded-lg rounded-bl-none px-3 py-2 max-w-[80%] shadow-sm">
                    <div className="whitespace-pre-line">{message.content}</div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-start">
                    <div className="bg-white border rounded-lg rounded-bl-none px-3 py-2 max-w-[80%] shadow-sm">
                      <div className="whitespace-pre-line">{message.content}</div>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    {message.options?.map((option) => (
                      <Button
                        key={option.id}
                        variant="outline"
                        className="justify-start text-left h-auto py-2 px-3 text-sm hover:bg-blue-50 hover:border-blue-300"
                        onClick={() => handleOptionClick(option)}
                      >
                        {option.text}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border rounded-lg rounded-bl-none px-3 py-2 shadow-sm">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <span className="ml-2 text-sm text-gray-500">Sarah is typing...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="p-3 border-t bg-white">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Bot className="h-3 w-3" />
            <span>Powered by Springing Stars AI Assistant</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
