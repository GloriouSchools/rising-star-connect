
export const getLetterGrade = (score: number): string => {
  if (score >= 90) return 'A+';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  if (score >= 50) return 'D';
  return 'F';
};

export const getGradePoint = (score: number): number => {
  if (score >= 90) return 4.0;
  if (score >= 80) return 3.5;
  if (score >= 70) return 3.0;
  if (score >= 60) return 2.5;
  if (score >= 50) return 2.0;
  return 1.0;
};

export const getPerformanceBand = (averageNum: number): string => {
  if (averageNum >= 80) return 'Excellent';
  if (averageNum >= 70) return 'Very Good';
  if (averageNum >= 60) return 'Good';
  if (averageNum >= 50) return 'Satisfactory';
  return 'Below Average';
};

export const getTeacherComment = (averageNum: number): string => {
  if (averageNum >= 80) return 'Keep up the excellent work!';
  if (averageNum >= 70) return 'Good performance. Continue working hard.';
  if (averageNum >= 60) return 'Satisfactory performance. More effort needed.';
  return 'Below expectations. Requires additional support.';
};
