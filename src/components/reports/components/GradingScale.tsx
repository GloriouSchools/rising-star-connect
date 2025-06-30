
import React from 'react';

export const GradingScale: React.FC = () => {
  return (
    <div className="p-6 border-b">
      <h4 className="text-lg font-bold text-blue-800 mb-4 border-b border-blue-800 pb-2">GRADING SCALE</h4>
      <div className="grid grid-cols-2 gap-4">
        <table className="border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-blue-800 text-white">
              <th className="border border-gray-300 p-2">Grade</th>
              <th className="border border-gray-300 p-2">Range</th>
              <th className="border border-gray-300 p-2">Points</th>
              <th className="border border-gray-300 p-2">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-gray-300 p-2 text-center font-bold">A+</td><td className="border border-gray-300 p-2 text-center">90-100</td><td className="border border-gray-300 p-2 text-center">4.0</td><td className="border border-gray-300 p-2">Outstanding</td></tr>
            <tr><td className="border border-gray-300 p-2 text-center font-bold">A</td><td className="border border-gray-300 p-2 text-center">80-89</td><td className="border border-gray-300 p-2 text-center">3.5</td><td className="border border-gray-300 p-2">Excellent</td></tr>
            <tr><td className="border border-gray-300 p-2 text-center font-bold">B</td><td className="border border-gray-300 p-2 text-center">70-79</td><td className="border border-gray-300 p-2 text-center">3.0</td><td className="border border-gray-300 p-2">Very Good</td></tr>
            <tr><td className="border border-gray-300 p-2 text-center font-bold">C</td><td className="border border-gray-300 p-2 text-center">60-69</td><td className="border border-gray-300 p-2 text-center">2.5</td><td className="border border-gray-300 p-2">Good</td></tr>
            <tr><td className="border border-gray-300 p-2 text-center font-bold">D</td><td className="border border-gray-300 p-2 text-center">50-59</td><td className="border border-gray-300 p-2 text-center">2.0</td><td className="border border-gray-300 p-2">Satisfactory</td></tr>
            <tr><td className="border border-gray-300 p-2 text-center font-bold">F</td><td className="border border-gray-300 p-2 text-center">Below 50</td><td className="border border-gray-300 p-2 text-center">1.0</td><td className="border border-gray-300 p-2">Needs Improvement</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
