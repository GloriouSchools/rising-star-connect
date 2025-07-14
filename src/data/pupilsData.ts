import { Student } from '@/hooks/useStudents';
import { pupilsDatabase, type PupilRecord } from './pupilsDatabase';

// Convert pupil database records to Student format
export const generateStudentsFromDatabase = (): Student[] => {
  return pupilsDatabase.map((pupil: PupilRecord) => ({
    id: pupil.id,
    name: pupil.name,
    class: pupil.class,
    age: pupil.age,
    parent: pupil.parent,
    phone: pupil.phone,
    fees: pupil.fees,
    status: pupil.status,
    photo: getPhotoPath(pupil.name), // Use GitHub URL
    email: pupil.email,
    address: pupil.address
  }));
};

const GITHUB_PHOTO_BASE_URL = 'https://gloriouschools.github.io/rising-star-connect/src/assets/photos/';
const DEFAULT_AVATAR_URL = '/lovable-uploads/16d4752b-1ad1-4a7e-be66-fff2acbea276.png';

export const getPhotoPath = (studentName: string): string => {
  if (!studentName) return DEFAULT_AVATAR_URL;
  
  // Convert student name to uppercase and encode for URL
  const encodedName = encodeURIComponent(studentName.toUpperCase());
  return `${GITHUB_PHOTO_BASE_URL}${encodedName}.JPG`;
};

export const getPhotoPathWithFallback = (studentName: string): { src: string; fallback: string } => {
  return {
    src: getPhotoPath(studentName),
    fallback: DEFAULT_AVATAR_URL
  };
};