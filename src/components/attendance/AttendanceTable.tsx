
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  UserX
} from 'lucide-react';
import { format } from 'date-fns';

interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  timeIn?: string;
  timeOut?: string;
  remarks?: string;
}

interface AttendanceTableProps {
  records: AttendanceRecord[];
  selectedDate: Date;
  canManageAttendance: boolean;
  onStatusChange: (studentId: string, status: AttendanceRecord['status']) => void;
  selectedStudents?: string[];
  onStudentSelect?: (students: string[]) => void;
}

export const AttendanceTable: React.FC<AttendanceTableProps> = ({
  records,
  selectedDate,
  canManageAttendance,
  onStatusChange,
  selectedStudents = [],
  onStudentSelect
}) => {
  const getStatusBadge = (status: AttendanceRecord['status']) => {
    const variants = {
      present: { variant: 'default' as const, icon: CheckCircle, color: 'text-green-600' },
      absent: { variant: 'destructive' as const, icon: XCircle, color: 'text-red-600' },
      late: { variant: 'secondary' as const, icon: AlertCircle, color: 'text-orange-600' },
      excused: { variant: 'outline' as const, icon: Clock, color: 'text-blue-600' }
    };

    const config = variants[status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleSelectStudent = (studentId: string, checked: boolean) => {
    if (!onStudentSelect) return;
    
    const newSelection = checked 
      ? [...selectedStudents, studentId]
      : selectedStudents.filter(id => id !== studentId);
    
    onStudentSelect(newSelection);
  };

  const handleSelectAll = (checked: boolean) => {
    if (!onStudentSelect) return;
    
    const newSelection = checked ? records.map(r => r.studentId) : [];
    onStudentSelect(newSelection);
  };

  const isAllSelected = records.length > 0 && selectedStudents.length === records.length;
  const isSomeSelected = selectedStudents.length > 0 && selectedStudents.length < records.length;

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            {canManageAttendance && onStudentSelect && (
              <TableHead className="w-12">
                <Checkbox
                  checked={isAllSelected || isSomeSelected}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
            )}
            <TableHead>Student ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Time In</TableHead>
            <TableHead>Time Out</TableHead>
            {canManageAttendance && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id} className="hover:bg-muted/50">
              {canManageAttendance && onStudentSelect && (
                <TableCell>
                  <Checkbox
                    checked={selectedStudents.includes(record.studentId)}
                    onCheckedChange={(checked) => 
                      handleSelectStudent(record.studentId, checked as boolean)
                    }
                  />
                </TableCell>
              )}
              <TableCell className="font-medium">{record.studentId}</TableCell>
              <TableCell className="font-medium">{record.studentName}</TableCell>
              <TableCell>
                <Badge variant="outline">{record.class}</Badge>
              </TableCell>
              <TableCell>{getStatusBadge(record.status)}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {record.timeIn || '—'}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {record.timeOut || '—'}
              </TableCell>
              {canManageAttendance && (
                <TableCell>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant={record.status === 'present' ? 'default' : 'outline'}
                      onClick={() => onStatusChange(record.studentId, 'present')}
                      className="text-xs px-2 py-1 h-7"
                    >
                      Present
                    </Button>
                    <Button
                      size="sm"
                      variant={record.status === 'absent' ? 'destructive' : 'outline'}
                      onClick={() => onStatusChange(record.studentId, 'absent')}
                      className="text-xs px-2 py-1 h-7"
                    >
                      Absent
                    </Button>
                    <Button
                      size="sm"
                      variant={record.status === 'late' ? 'secondary' : 'outline'}
                      onClick={() => onStatusChange(record.studentId, 'late')}
                      className="text-xs px-2 py-1 h-7"
                    >
                      Late
                    </Button>
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {records.length === 0 && (
        <div className="text-center py-12">
          <UserX className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No students found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};
