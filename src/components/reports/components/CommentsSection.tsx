
import React from 'react';
import { getTeacherComment } from '../utils/gradingUtils';

interface CommentsSectionProps {
  averageNum: number;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({ averageNum }) => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h4 className="text-lg font-bold text-blue-800 mb-2 border-b border-blue-800 pb-2">CLASS TEACHER'S COMMENT</h4>
        <p className="text-gray-700 italic">
          {getTeacherComment(averageNum)}
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-8 mt-8">
        <div className="space-y-4">
          <div>
            <p className="font-semibold mb-2">Class Teacher:</p>
            <div className="border-b border-gray-400 h-6"></div>
            <p className="text-sm text-gray-600 mt-1">Signature & Date</p>
          </div>
          <div>
            <p className="font-semibold mb-2">Parent/Guardian:</p>
            <div className="border-b border-gray-400 h-6"></div>
            <p className="text-sm text-gray-600 mt-1">Signature & Date</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <p className="font-semibold mb-2">Head Teacher:</p>
            <div className="border-b border-gray-400 h-6"></div>
            <p className="text-sm text-gray-600 mt-1">Signature & Date</p>
          </div>
        </div>
      </div>
    </div>
  );
};
