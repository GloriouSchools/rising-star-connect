
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Calendar, Users, Filter, RefreshCw } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useStudents } from '@/hooks/useStudents';
import { useToast } from '@/hooks/use-toast';
import AnimatedInView from '@/components/AnimatedInView';
import { exportAttendanceToCSV } from '@/utils/attendanceExport';
import { AttendanceStats } from '@/components/attendance/AttendanceStats';
import { AttendanceFilters } from '@/components/attendance/AttendanceFilters';
import { AttendanceTable } from '@/components/attendance/AttendanceTable';
import { useAttendanceData } from '@/hooks/useAttendanceData';
import { format } from 'date-fns';

export const Attendance = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { attendanceRecords, updateAttendanceStatus } = useAttendanceData();
  const { availableClasses, students } = useStudents();
  
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const filteredRecords = useMemo(() => {
    return attendanceRecords.filter(record => {
      const matchesSearch = record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           record.studentId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesClass = selectedClass === 'all' || record.class === selectedClass;
      const matchesDate = record.date === format(selectedDate, 'yyyy-MM-dd');
      return matchesSearch && matchesClass && matchesDate;
    });
  }, [attendanceRecords, searchTerm, selectedClass, selectedDate]);

  const handleQuickAttendance = (studentId: string, status: 'present' | 'absent' | 'late' | 'excused') => {
    updateAttendanceStatus(studentId, status);
    
    const student = attendanceRecords.find(r => r.studentId === studentId);
    toast({
      title: 'Attendance Updated',
      description: `${student?.studentName} marked as ${status}`,
    });
  };

  const handleBulkAttendance = (status: 'present' | 'absent' | 'late' | 'excused') => {
    if (selectedStudents.length === 0) {
      toast({
        title: 'No Students Selected',
        description: 'Please select students first.',
        variant: 'destructive',
      });
      return;
    }

    selectedStudents.forEach(studentId => {
      updateAttendanceStatus(studentId, status);
    });

    toast({
      title: 'Bulk Update Successful',
      description: `${selectedStudents.length} students marked as ${status}`,
    });

    setSelectedStudents([]);
  };

  const handleExport = () => {
    if (filteredRecords.length === 0) {
      toast({
        title: 'No Data to Export',
        description: 'No attendance records match your current filters.',
        variant: 'destructive',
      });
      return;
    }

    exportAttendanceToCSV(filteredRecords);
    
    toast({
      title: 'Export Successful',
      description: `Exported ${filteredRecords.length} attendance records to CSV.`,
    });
  };

  const canManageAttendance = user?.role === 'admin' || user?.role === 'teacher';
  const attendanceRate = filteredRecords.length > 0 
    ? Math.round((filteredRecords.filter(r => r.status === 'present').length / filteredRecords.length) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <AnimatedInView>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Attendance Management</h1>
                <p className="text-muted-foreground">
                  Track and manage student attendance for {format(selectedDate, 'MMMM dd, yyyy')}
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {format(selectedDate, 'MMM dd, yyyy')}
              </Badge>
              <Badge variant="outline">
                {filteredRecords.length} students
              </Badge>
              <Badge variant={attendanceRate >= 90 ? 'default' : attendanceRate >= 75 ? 'secondary' : 'destructive'}>
                {attendanceRate}% present
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {canManageAttendance && selectedStudents.length > 0 && (
              <div className="flex items-center gap-2 mr-4">
                <span className="text-sm text-muted-foreground">
                  {selectedStudents.length} selected
                </span>
                <Button size="sm" variant="outline" onClick={() => handleBulkAttendance('present')}>
                  Mark Present
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAttendance('absent')}>
                  Mark Absent
                </Button>
              </div>
            )}
            
            <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            
            {canManageAttendance && (
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            )}
          </div>
        </div>
      </AnimatedInView>

      {/* Enhanced Stats */}
      <AnimatedInView>
        <AttendanceStats records={filteredRecords} />
      </AnimatedInView>

      {/* Enhanced Filters */}
      <AnimatedInView>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AttendanceFilters
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedClass={selectedClass}
              setSelectedClass={setSelectedClass}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              availableClasses={availableClasses}
            />
          </CardContent>
        </Card>
      </AnimatedInView>

      {/* Enhanced Attendance Table */}
      <AnimatedInView>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Student Attendance</span>
              {filteredRecords.length > 0 && (
                <Badge variant="outline">
                  {filteredRecords.length} students
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AttendanceTable
              records={filteredRecords}
              selectedDate={selectedDate}
              canManageAttendance={canManageAttendance}
              onStatusChange={handleQuickAttendance}
              selectedStudents={selectedStudents}
              onStudentSelect={setSelectedStudents}
            />
          </CardContent>
        </Card>
      </AnimatedInView>
    </div>
  );
};
