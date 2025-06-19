
import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Bot, X, Send, Paperclip, Smile } from 'lucide-react';

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
  const [currentOptions, setCurrentOptions] = useState<Array<{ id: string; text: string; nextFlow: string }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
      setCurrentOptions([]);
      
      setTimeout(() => {
        addBotMessage('welcome');
      }, 1000);
    }
  }, [isOpen, hasStarted]);

  const addBotMessage = (flowKey: string) => {
    const flow = chatFlows[flowKey];
    if (!flow) return;

    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: flow.message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newMessage]);
      
      if (flow.options && !flow.isEnd) {
        setCurrentOptions(flow.options);
        
        // Add options display message
        setTimeout(() => {
          const optionsText = flow.options!.map(option => `${option.id}. ${option.text}`).join('\n');
          const optionsMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: 'bot',
            content: `Please type the number of your choice:\n\n${optionsText}`,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, optionsMessage]);
        }, 500);
      } else {
        setCurrentOptions([]);
      }
    }, 1500 + Math.random() * 1000);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Check if the message is a valid option number
    const optionNumber = inputMessage.trim();
    const selectedOption = currentOptions.find(option => option.id === optionNumber);

    if (selectedOption) {
      setCurrentFlow(selectedOption.nextFlow);
      setCurrentOptions([]);
      
      setTimeout(() => {
        addBotMessage(selectedOption.nextFlow);
      }, 500);
    } else if (currentOptions.length > 0) {
      // Invalid option
      setTimeout(() => {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: `Sorry, "${optionNumber}" is not a valid option. Please choose from the available numbers (${currentOptions.map(opt => opt.id).join(', ')}).`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      }, 500);
    } else {
      // No current options, general response
      setTimeout(() => {
        const generalMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: "I'm here to help! To get started, please type 'help' or 'start' to see the available options.",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, generalMessage]);
        
        // Reset to welcome flow
        setTimeout(() => {
          addBotMessage('welcome');
        }, 1000);
      }, 500);
    }

    setInputMessage('');
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleClose = () => {
    setMessages([]);
    setHasStarted(false);
    setIsTyping(false);
    setCurrentOptions([]);
    setInputMessage('');
    onClose();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md h-[600px] flex flex-col p-0">
        {/* Header */}
        <DialogHeader className="px-4 py-3 border-b bg-gradient-to-r from-blue-500 to-blue-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold text-white">Sarah</DialogTitle>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <p className="text-sm text-blue-100">Online</p>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleClose} className="text-white hover:bg-blue-400">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`rounded-2xl px-4 py-2 ${
                  message.type === 'user' 
                    ? 'bg-blue-500 text-white rounded-br-md' 
                    : 'bg-white border rounded-bl-md shadow-sm'
                }`}>
                  <div className="whitespace-pre-line text-sm">{message.content}</div>
                </div>
                <div className={`text-xs text-gray-500 mt-1 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
              {message.type === 'bot' && (
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2 order-0 flex-shrink-0">
                  <Bot className="h-4 w-4 text-blue-600" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                <Bot className="h-4 w-4 text-blue-600" />
              </div>
              <div className="bg-white border rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t bg-white">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-gray-500">
              <Paperclip className="h-4 w-4" />
            </Button>
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="pr-10 rounded-full border-gray-300 focus:border-blue-500"
              />
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                <Smile className="h-4 w-4" />
              </Button>
            </div>
            <Button 
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              size="sm"
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-10 h-10 p-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
            <Bot className="h-3 w-3" />
            <span>Powered by Springing Stars AI Assistant</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
