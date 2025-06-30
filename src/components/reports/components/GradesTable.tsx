
import React from 'react';
import { getLetterGrade, getGradePoint } from '../utils/gradingUtils';

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

interface GradesTableProps {
  grades: Grade[];
}

export const GradesTable: React.FC<GradesTableProps> = ({ grades }) => {
  return (
    <div className="p-6">
      <h4 className="text-lg font-bold text-blue-800 mb-4 border-b border-blue-800 pb-2">ACADEMIC PERFORMANCE</h4>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-blue-800 text-white">
              <th className="border border-gray-300 p-2">Subject</th>
              <th className="border border-gray-300 p-2">Practical</th>
              <th className="border border-gray-300 p-2">Theory</th>
              <th className="border border-gray-300 p-2">Total</th>
              <th className="border border-gray-300 p-2">Max</th>
              <th className="border border-gray-300 p-2">%</th>
              <th className="border border-gray-300 p-2">Grade</th>
              <th className="border border-gray-300 p-2">Points</th>
              <th className="border border-gray-300 p-2">Attendance</th>
              <th className="border border-gray-300 p-2">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade: Grade, index: number) => (
              <tr key={grade.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="border border-gray-300 p-2 font-medium">{grade.subject}</td>
                <td className="border border-gray-300 p-2 text-center">{grade.practicalMarks || 'N/A'}</td>
                <td className="border border-gray-300 p-2 text-center">{grade.theoryMarks || 'N/A'}</td>
                <td className="border border-gray-300 p-2 text-center font-bold">{grade.totalMarks}</td>
                <td className="border border-gray-300 p-2 text-center">{grade.maxMarks}</td>
                <td className="border border-gray-300 p-2 text-center">{((grade.totalMarks / grade.maxMarks) * 100).toFixed(1)}%</td>
                <td className="border border-gray-300 p-2 text-center font-bold text-blue-600">{getLetterGrade(grade.grade)}</td>
                <td className="border border-gray-300 p-2 text-center">{getGradePoint(grade.grade)}</td>
                <td className="border border-gray-300 p-2 text-center">{grade.attendance || 'N/A'}%</td>
                <td className="border border-gray-300 p-2 text-xs">{grade.comment || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
