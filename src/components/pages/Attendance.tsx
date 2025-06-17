
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  UserCheck, 
  UserX, 
  Clock, 
  CalendarDays, 
  Search,
  Download,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/contexts/ProfileContext';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import AnimatedInView from '@/components/AnimatedInView';
import { AttendanceDialog } from '@/components/attendance/AttendanceDialog';
import { exportAttendanceToCSV, exportAttendanceToJSON } from '@/utils/attendanceExport';

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

export const Attendance = () => {
  const { user } = useAuth();
  const { profileData } = useProfile();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'edit' | 'mark'>('mark');
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | undefined>();
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([
    {
      id: '1',
      studentId: 'SS001',
      studentName: 'Sarah Nakato',
      class: 'P.7A',
      date: format(new Date(), 'yyyy-MM-dd'),
      status: 'present',
      timeIn: '8:00 AM',
      timeOut: '3:30 PM'
    },
    {
      id: '2',
      studentId: 'SS002',
      studentName: 'John Mukasa',
      class: 'P.6B',
      date: format(new Date(), 'yyyy-MM-dd'),
      status: 'late',
      timeIn: '8:45 AM',
      remarks: 'Transport delay'
    },
    {
      id: '3',
      studentId: 'SS003',
      studentName: 'Mary Namuli',
      class: 'P.5A',
      date: format(new Date(), 'yyyy-MM-dd'),
      status: 'absent',
      remarks: 'Sick leave'
    },
    {
      id: '4',
      studentId: 'SS004',
      studentName: 'David Ssali',
      class: 'P.7B',
      date: format(new Date(), 'yyyy-MM-dd'),
      status: 'present',
      timeIn: '7:55 AM',
      timeOut: '3:30 PM'
    }
  ]);

  const handleMarkAttendance = () => {
    setDialogMode('mark');
    setSelectedRecord(undefined);
    setShowDialog(true);
  };

  const handleEditRecord = (record: AttendanceRecord) => {
    setDialogMode('edit');
    setSelectedRecord(record);
    setShowDialog(true);
  };

  const handleSaveRecord = (record: AttendanceRecord) => {
    if (dialogMode === 'edit') {
      setAttendanceRecords(prev => 
        prev.map(r => r.id === record.id ? record : r)
      );
    } else {
      setAttendanceRecords(prev => [...prev, record]);
    }
    setShowDialog(false);
  };

  const handleExport = () => {
    const filteredData = filteredRecords;
    
    if (filteredData.length === 0) {
      toast({
        title: 'No Data to Export',
        description: 'No attendance records match your current filters.',
        variant: 'destructive',
      });
      return;
    }

    // For now, we'll export as CSV. You could add a dialog to choose format
    exportAttendanceToCSV(filteredData);
    
    toast({
      title: 'Export Successful',
      description: `Exported ${filteredData.length} attendance records to CSV.`,
    });
  };

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

  const getAttendanceStats = () => {
    const total = attendanceRecords.length;
    const present = attendanceRecords.filter(r => r.status === 'present').length;
    const absent = attendanceRecords.filter(r => r.status === 'absent').length;
    const late = attendanceRecords.filter(r => r.status === 'late').length;
    const excused = attendanceRecords.filter(r => r.status === 'excused').length;

    return { total, present, absent, late, excused };
  };

  const stats = getAttendanceStats();

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch = record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || record.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const canManageAttendance = user?.role === 'admin' || user?.role === 'teacher';

  return (
    <div className="space-y-6">
      {/* Header */}
      <AnimatedInView>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Attendance Management</h1>
            <p className="text-gray-600">
              {user?.role === 'teacher' 
                ? 'Track and manage student attendance for your classes'
                : user?.role === 'admin'
                ? 'Monitor attendance across all classes and students'
                : 'View attendance records and statistics'
              }
            </p>
          </div>
          {canManageAttendance && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm" onClick={handleMarkAttendance}>
                <UserCheck className="h-4 w-4 mr-2" />
                Mark Attendance
              </Button>
            </div>
          )}
        </div>
      </AnimatedInView>

      {/* Stats Cards */}
      <AnimatedInView>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <UserCheck className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-sm text-gray-600">Total Students</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-green-600">{stats.present}</p>
                  <p className="text-sm text-gray-600">Present</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <XCircle className="h-8 w-8 text-red-600" />
                <div>
                  <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
                  <p className="text-sm text-gray-600">Absent</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold text-orange-600">{stats.late}</p>
                  <p className="text-sm text-gray-600">Late</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-blue-600">{stats.excused}</p>
                  <p className="text-sm text-gray-600">Excused</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AnimatedInView>

      {/* Filters */}
      <AnimatedInView>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search">Search Students</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search by name or student ID..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="class">Class</Label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="P.7A">P.7A</SelectItem>
                    <SelectItem value="P.7B">P.7B</SelectItem>
                    <SelectItem value="P.6A">P.6A</SelectItem>
                    <SelectItem value="P.6B">P.6B</SelectItem>
                    <SelectItem value="P.5A">P.5A</SelectItem>
                    <SelectItem value="P.5B">P.5B</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-40 justify-start text-left font-normal">
                      <CalendarDays className="mr-2 h-4 w-4" />
                      {format(selectedDate, 'MMM dd, yyyy')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>
      </AnimatedInView>

      {/* Attendance Table */}
      <AnimatedInView>
        <Card>
          <CardHeader>
            <CardTitle>
              Attendance Records - {format(selectedDate, 'MMMM dd, yyyy')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Time In</TableHead>
                  <TableHead>Time Out</TableHead>
                  <TableHead>Remarks</TableHead>
                  {canManageAttendance && <TableHead>Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.studentId}</TableCell>
                    <TableCell>{record.studentName}</TableCell>
                    <TableCell>{record.class}</TableCell>
                    <TableCell>{getStatusBadge(record.status)}</TableCell>
                    <TableCell>{record.timeIn || '-'}</TableCell>
                    <TableCell>{record.timeOut || '-'}</TableCell>
                    <TableCell>{record.remarks || '-'}</TableCell>
                    {canManageAttendance && (
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditRecord(record)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredRecords.length === 0 && (
              <div className="text-center py-8">
                <UserX className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No attendance records found</p>
                <p className="text-sm text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </CardContent>
        </Card>
      </AnimatedInView>

      {/* Attendance Dialog */}
      <AttendanceDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        onSave={handleSaveRecord}
        record={selectedRecord}
        mode={dialogMode}
      />
    </div>
  );
};
