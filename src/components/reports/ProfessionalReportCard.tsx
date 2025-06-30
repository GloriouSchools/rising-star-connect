
import React from 'react';
import { ReportHeader } from './components/ReportHeader';
import { StudentInfoSection } from './components/StudentInfoSection';
import { GradesTable } from './components/GradesTable';
import { AcademicSummary } from './components/AcademicSummary';
import { GradingScale } from './components/GradingScale';
import { CommentsSection } from './components/CommentsSection';
import { generatePDFReportCard } from './utils/pdfGenerator';
import { getLetterGrade, getGradePoint } from './utils/gradingUtils';

interface Student {
  id: string;
  name: string;
  class: string;
  dob: string;
  admissionNumber: string;
  rollNumber: string;
  section: string;
  houseColor: string;
  fatherName: string;
  motherName: string;
  address: string;
  phoneNumber: string;
}

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

interface ProfessionalReportCardProps {
  data: { students: Student[]; grades: Grade[] };
  studentId: string;
}

export const ProfessionalReportCard: React.FC<ProfessionalReportCardProps> = ({ data, studentId }) => {
  const generateReportCard = () => {
    if (!studentId) {
      alert('Please select a student');
      return null;
    }
    
    const student = data.students.find((s: Student) => s.id === studentId);
    if (!student) {
      return <p className="text-red-500">Student not found</p>;
    }

    const grades = data.grades.filter((g: Grade) => g.student_id === studentId);
    let total = 0, totalAttendance = 0, count = 0, totalGradePoints = 0;
    
    grades.forEach((g: Grade) => {
      total += g.grade || 0;
      totalAttendance += g.attendance || 0;
      totalGradePoints += getGradePoint(g.grade || 0);
      count++;
    });
    
    const average = count > 0 ? (total / count).toFixed(1) : 'N/A';
    const averageNum = count > 0 ? (total / count) : 0;
    const avgAttendance = count > 0 ? (totalAttendance / count).toFixed(1) : 'N/A';
    const gpa = count > 0 ? (totalGradePoints / count).toFixed(2) : 'N/A';

    const downloadReportCard = async () => {
      await generatePDFReportCard(student, grades, averageNum);
    };

    return (
      <div className="bg-white border-2 border-gray-300 shadow-lg">
        <ReportHeader />
        <StudentInfoSection student={student} />
        <GradesTable grades={grades} />
        <AcademicSummary 
          grades={grades}
          average={average}
          averageNum={averageNum}
          gpa={gpa}
          avgAttendance={avgAttendance}
          count={count}
        />
        <GradingScale />
        <CommentsSection averageNum={averageNum} />
        
        {/* Download button */}
        <div className="text-center p-4 bg-gray-100 border-t">
          <p className="text-xs text-gray-600">This is a computer-generated report. For queries, contact the school administration.</p>
          <button
            onClick={downloadReportCard}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold"
          >
            Download PDF Report Card
          </button>
        </div>
      </div>
    );
  };

  return generateReportCard();
};
