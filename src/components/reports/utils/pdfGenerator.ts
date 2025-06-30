
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { getLetterGrade, getGradePoint, getTeacherComment } from './gradingUtils';

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

export const generatePDFReportCard = async (student: Student, grades: Grade[], averageNum: number) => {
  try {
    const doc = new jsPDF();

    // Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(30, 58, 138);
    doc.text('SPRINGING STARS SCHOOL', 105, 30, { align: 'center' });
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('P.O. Box 1234, Kampala, Uganda', 105, 40, { align: 'center' });
    doc.text('Tel: +256-414-123456 | Email: info@springingstars.ac.ug', 105, 47, { align: 'center' });
    
    // Report title
    doc.setFillColor(127, 29, 29);
    doc.rect(15, 55, 180, 12, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text('STUDENT PROGRESS REPORT', 105, 63, { align: 'center' });
    doc.setFontSize(10);
    doc.text('TERM 1 - ACADEMIC YEAR 2024/2025', 105, 70, { align: 'center' });

    // Student Information
    doc.setFillColor(239, 246, 255);
    doc.rect(15, 80, 180, 40, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(30, 58, 138);
    doc.text('STUDENT INFORMATION', 20, 90);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    
    // Student details
    doc.text(`Student Name: ${student.name}`, 20, 100);
    doc.text(`Class: ${student.class}`, 20, 107);
    doc.text(`Admission Number: ${student.admissionNumber || 'N/A'}`, 20, 114);
    
    doc.text(`Date of Birth: ${student.dob}`, 110, 100);
    doc.text(`Roll Number: ${student.rollNumber || 'N/A'}`, 110, 107);
    doc.text(`House: ${student.houseColor || 'N/A'}`, 110, 114);

    // Academic Performance
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(30, 58, 138);
    doc.text('ACADEMIC PERFORMANCE', 20, 135);

    // Grades table
    const tableData = grades.map((grade: Grade) => [
      grade.subject,
      (grade.practicalMarks || 0).toString(),
      (grade.theoryMarks || 0).toString(),
      (grade.totalMarks || 0).toString(),
      (grade.maxMarks || 100).toString(),
      `${(((grade.totalMarks || 0) / (grade.maxMarks || 100)) * 100).toFixed(1)}%`,
      getLetterGrade(grade.grade || 0),
      getGradePoint(grade.grade || 0).toString(),
      grade.attendance ? `${grade.attendance}%` : 'N/A',
      grade.comment || 'Good'
    ]);

    autoTable(doc, {
      startY: 145,
      head: [['Subject', 'Practical', 'Theory', 'Total', 'Max', '%', 'Grade', 'Points', 'Attendance', 'Remarks']],
      body: tableData,
      theme: 'grid',
      styles: { 
        fontSize: 8,
        cellPadding: 2
      },
      headStyles: { 
        fillColor: [30, 58, 138],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      columnStyles: {
        0: { cellWidth: 25 },
        9: { cellWidth: 25 }
      }
    });

    // Summary
    const finalY = (doc as any).lastAutoTable.finalY + 15;
    doc.setFillColor(249, 250, 251);
    doc.rect(15, finalY, 180, 25, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(30, 58, 138);
    doc.text('ACADEMIC SUMMARY', 20, finalY + 10);
    
    const count = grades.length;
    const total = grades.reduce((sum, g) => sum + (g.grade || 0), 0);
    const average = count > 0 ? (total / count).toFixed(1) : 'N/A';
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Total Subjects: ${count}`, 20, finalY + 18);
    doc.text(`Average Score: ${average}%`, 20, finalY + 25);
    doc.text(`Overall Grade: ${getLetterGrade(averageNum)}`, 110, finalY + 18);

    // Comments
    const commentsY = finalY + 35;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(30, 58, 138);
    doc.text('CLASS TEACHER\'S COMMENT', 20, commentsY);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(getTeacherComment(averageNum), 20, commentsY + 10);

    // Signatures
    const sigY = commentsY + 25;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Class Teacher: ____________________', 20, sigY);
    doc.text('Head Teacher: ____________________', 20, sigY + 15);
    doc.text('Parent/Guardian: ____________________', 20, sigY + 30);

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('This is a computer-generated report. For queries, contact the school administration.', 105, 280, { align: 'center' });

    doc.save(`${student.name.replace(/\s+/g, '_')}_Report_Card.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please try again.');
  }
};
