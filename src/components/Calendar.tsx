'use client'
import { useState, useEffect } from 'react';
import type { Assignment, TimeSlot } from '@/types';

interface CalendarProps {
  userRole: 'Admin' | 'Coordinator' | 'Member';
}

export default function Calendar({ userRole }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [timeSlots] = useState<TimeSlot[]>([
    { id: '1', name: 'Mañana', startTime: '09:00', endTime: '12:00' },
    { id: '2', name: 'Tarde', startTime: '14:00', endTime: '17:00' },
    { id: '3', name: 'Noche', startTime: '19:00', endTime: '21:00' },
  ]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Días del mes anterior
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    
    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ date: new Date(year, month, day), isCurrentMonth: true });
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getAssignmentsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return assignments.filter(a => a.date === dateStr);
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        
        <div className="flex space-x-2">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-gray-100 rounded"
          >
            ←
          </button>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-gray-100 rounded"
          >
            →
          </button>
        </div>
      </div>

      {userRole === 'Admin' && (
        <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg">
          <span className="text-blue-800">
            Calendario del mes - Haz clic en un día para gestionar asignaciones
          </span>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Publicar Calendario
          </button>
        </div>
      )}

      <div className="grid grid-cols-7 gap-1">
        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
          <div key={day} className="p-2 text-center font-medium text-gray-500 bg-gray-50">
            {day}
          </div>
        ))}
        
        {days.map((day, index) => {
          const dayAssignments = getAssignmentsForDate(day.date);
          
          return (
            <div
              key={index}
              className={`min-h-[100px] p-2 border ${
                day.isCurrentMonth 
                  ? 'bg-white hover:bg-gray-50' 
                  : 'bg-gray-100 text-gray-400'
              } ${userRole === 'Admin' ? 'cursor-pointer' : ''}`}
            >
              <div className="font-medium mb-1">
                {day.date.getDate()}
              </div>
              
              <div className="space-y-1">
                {timeSlots.map(slot => {
                  const slotAssignments = dayAssignments.filter(a => a.timeSlotId === slot.id);
                  
                  return (
                    <div key={slot.id} className="text-xs">
                      <div className="font-medium text-gray-600">{slot.name}</div>
                      {slotAssignments.map(assignment => (
                        <div
                          key={assignment.id}
                          className={`px-1 py-0.5 rounded text-xs ${
                            assignment.status === 'assigned' 
                              ? 'bg-blue-100 text-blue-800'
                              : assignment.status === 'recommended'
                              ? 'bg-yellow-100 text-yellow-800'
                              : assignment.status === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          Usuario {assignment.userId.slice(-4)}
                        </div>
                      ))}
                      
                      {userRole === 'Coordinator' && slotAssignments.length === 0 && (
                        <button className="text-xs text-blue-600 hover:text-blue-800">
                          + Recomendar
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex space-x-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-200 rounded"></div>
          <span>Recomendado</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-200 rounded"></div>
          <span>Asignado</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-200 rounded"></div>
          <span>Confirmado</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-200 rounded"></div>
          <span>Rechazado</span>
        </div>
      </div>
    </div>
  );
}