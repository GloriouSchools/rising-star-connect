
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';
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

// Function to load image as base64
const loadImageAsBase64 = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => {
      // Fallback - create a simple colored circle as logo
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 64;
      canvas.height = 64;
      if (ctx) {
        ctx.fillStyle = '#1e40af';
        ctx.beginPath();
        ctx.arc(32, 32, 30, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('SS', 32, 38);
      }
      resolve(canvas.toDataURL('image/png'));
    };
    img.src = url;
  });
};

// Function to create watermark
const createWatermark = (): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 200;
  
  if (ctx) {
    ctx.fillStyle = 'rgba(30, 64, 175, 0.1)';
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.save();
    ctx.translate(200, 100);
    ctx.rotate(-Math.PI / 6);
    ctx.fillText('SPRINGING STARS', 0, 0);
    ctx.fillText('SCHOOL', 0, 50);
    ctx.restore();
  }
  
  return canvas.toDataURL('image/png');
};

export const generatePDFReportCard = async (student: Student, grades: Grade[], averageNum: number) => {
  try {
    const doc = new jsPDF();
    
    // Load logo and create watermark
    const logoBase64 = await loadImageAsBase64('https://springingstars.ac.ug/wp-content/uploads/2023/04/logo.png');
    const watermarkBase64 = createWatermark();

    // Add watermark to background
    doc.addImage(watermarkBase64, 'PNG', 50, 80, 100, 50);
    doc.addImage(watermarkBase64, 'PNG', 50, 180, 100, 50);

    // Header with logo
    doc.addImage(logoBase64, 'PNG', 20, 15, 20, 20);
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(30, 58, 138);
    doc.text('SPRINGING STARS SCHOOL', 105, 25, { align: 'center' });
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('P.O. Box 1234, Kampala, Uganda', 105, 32, { align: 'center' });
    doc.text('Tel: +256-414-123456 | Email: info@springingstars.ac.ug', 105, 38, { align: 'center' });
    
    // Report title
    doc.setFillColor(127, 29, 29);
    doc.rect(15, 45, 180, 12, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text('STUDENT PROGRESS REPORT', 105, 53, { align: 'center' });
    doc.setFontSize(10);
    doc.text('TERM 1 - ACADEMIC YEAR 2024/2025', 105, 60, { align: 'center' });

    // Student Information
    doc.setFillColor(239, 246, 255);
    doc.rect(15, 70, 180, 40, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(30, 58, 138);
    doc.text('STUDENT INFORMATION', 20, 80);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    
    // Student details
    doc.text(`Student Name: ${student.name}`, 20, 90);
    doc.text(`Class: ${student.class}`, 20, 97);
    doc.text(`Admission Number: ${student.admissionNumber || 'N/A'}`, 20, 104);
    
    doc.text(`Date of Birth: ${student.dob}`, 110, 90);
    doc.text(`Roll Number: ${student.rollNumber || 'N/A'}`, 110, 97);
    doc.text(`House: ${student.houseColor || 'N/A'}`, 110, 104);

    // Academic Performance
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(30, 58, 138);
    doc.text('ACADEMIC PERFORMANCE', 20, 125);

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
      startY: 135,
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
