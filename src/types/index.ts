export interface User {
  id: string;
  username: string;
  email: string;
  role: 'Admin' | 'Coordinator' | 'Member';
  groupId?: string;
  age?: number;
}

export interface Group {
  id: string;
  name: string;
  coordinatorId: string;
  minAge?: number;
  maxAge?: number;
  members: User[];
}

export interface TimeSlot {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
}

export interface Assignment {
  id: string;
  userId: string;
  groupId: string;
  timeSlotId: string;
  date: string;
  status: 'recommended' | 'assigned' | 'confirmed' | 'rejected';
  assignedBy: string;
  confirmedAt?: string;
}

export interface MonthlyCalendar {
  id: string;
  month: number;
  year: number;
  published: boolean;
  publishedAt?: string;
  assignments: Assignment[];
}