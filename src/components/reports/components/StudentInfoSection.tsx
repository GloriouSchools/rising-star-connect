
import React from 'react';

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

interface StudentInfoSectionProps {
  student: Student;
}

export const StudentInfoSection: React.FC<StudentInfoSectionProps> = ({ student }) => {
  return (
    <div className="p-6 bg-blue-50 border-b">
      <h4 className="text-lg font-bold text-blue-800 mb-4 border-b border-blue-800 pb-2">STUDENT INFORMATION</h4>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <p><span className="font-semibold text-gray-700">Student Name:</span> <span className="font-bold">{student.name}</span></p>
          <p><span className="font-semibold text-gray-700">Admission Number:</span> {student.admissionNumber || 'N/A'}</p>
          <p><span className="font-semibold text-gray-700">Class:</span> {student.class}</p>
          <p><span className="font-semibold text-gray-700">Roll Number:</span> {student.rollNumber || 'N/A'}</p>
          <p><span className="font-semibold text-gray-700">House:</span> {student.houseColor || 'N/A'}</p>
        </div>
        <div className="space-y-2">
          <p><span className="font-semibold text-gray-700">Date of Birth:</span> {student.dob}</p>
          <p><span className="font-semibold text-gray-700">Father's Name:</span> {student.fatherName || 'N/A'}</p>
          <p><span className="font-semibold text-gray-700">Mother's Name:</span> {student.motherName || 'N/A'}</p>
          <p><span className="font-semibold text-gray-700">Contact Number:</span> {student.phoneNumber || 'N/A'}</p>
          <p><span className="font-semibold text-gray-700">Address:</span> {student.address || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};
