
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Paperclip, Smile, Send, Bot } from 'lucide-react';

interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  inputMessage,
  setInputMessage,
  onSendMessage,
  onKeyPress
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
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
            onKeyPress={onKeyPress}
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
          onClick={onSendMessage}
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
  );
};
