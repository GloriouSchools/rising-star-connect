
import React from 'react';
import { getLetterGrade, getPerformanceBand } from '../utils/gradingUtils';

interface Grade {
  id: number;
  student_id: string;
  subject: string;
  grade: number;
  teacher: string;
  comment: string;
  attendance: number | null;
  practicalMarks?: number;
  theoryMarks?: number;
  totalMarks: number;
  maxMarks: number;
}

interface AcademicSummaryProps {
  grades: Grade[];
  average: string;
  averageNum: number;
  gpa: string;
  avgAttendance: string;
  count: number;
}

export const AcademicSummary: React.FC<AcademicSummaryProps> = ({ 
  grades, 
  average, 
  averageNum, 
  gpa, 
  avgAttendance, 
  count 
}) => {
  return (
    <div className="p-6 bg-gray-50 border-t border-b">
      <h4 className="text-lg font-bold text-blue-800 mb-4 border-b border-blue-800 pb-2">ACADEMIC SUMMARY</h4>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <p><span className="font-semibold">Total Subjects:</span> {count}</p>
          <p><span className="font-semibold">Average Score:</span> <span className="font-bold text-blue-600">{average}%</span></p>
          <p><span className="font-semibold">Overall Grade:</span> <span className="font-bold text-blue-600">{getLetterGrade(averageNum)}</span></p>
          <p><span className="font-semibold">Grade Point Average:</span> <span className="font-bold">{gpa}</span></p>
          <p><span className="font-semibold">Average Attendance:</span> <span className="font-bold">{avgAttendance}%</span></p>
        </div>
        <div className="space-y-2">
          <p><span className="font-semibold">Class Position:</span> {Math.floor(Math.random() * 25) + 1} out of 45</p>
          <p><span className="font-semibold">Performance Band:</span> 
            <span className="font-bold text-green-600">
              {getPerformanceBand(averageNum)}
            </span>
          </p>
          <p><span className="font-semibold">Next Term Begins:</span> Monday, 8th January 2025</p>
        </div>
      </div>
    </div>
  );
};
