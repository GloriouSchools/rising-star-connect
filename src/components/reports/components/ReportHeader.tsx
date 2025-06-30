
import React from 'react';

export const ReportHeader: React.FC = () => {
  return (
    <div className="text-center p-6 border-b-2 border-blue-800">
      <div className="flex items-center justify-center mb-4">
        <img 
          src="https://springingstars.ac.ug/wp-content/uploads/2023/04/logo.png" 
          alt="School Logo" 
          className="w-16 h-16 mr-4"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <div>
          <h2 className="text-2xl font-bold text-blue-800">SPRINGING STARS SCHOOL</h2>
          <p className="text-sm text-gray-600">P.O. Box 1234, Kampala, Uganda</p>
          <p className="text-sm text-gray-600">Tel: +256-414-123456 | Email: info@springingstars.ac.ug</p>
        </div>
      </div>
      <div className="bg-red-800 text-white py-2 px-4 rounded">
        <h3 className="text-lg font-bold">STUDENT PROGRESS REPORT</h3>
        <p className="text-sm">TERM 1 - ACADEMIC YEAR 2024/2025</p>
      </div>
    </div>
  );
};
