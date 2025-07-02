'use client'
import { useState, useEffect } from 'react';
import type { Assignment } from '@/types';

interface MemberDashboardProps {
  user: any;
}

export default function MemberDashboard({ user }: MemberDashboardProps) {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Aquí cargarías las asignaciones del usuario desde la API
    // Por ahora, datos de ejemplo
    setAssignments([
      {
        id: '1',
        userId: user?.userId || '',
        groupId: 'group1',
        timeSlotId: 'slot1',
        date: '2024-12-15',
        status: 'assigned',
        assignedBy: 'admin1'
      }
    ]);
    setLoading(false);
  }, [user]);

  if (loading) {
    return <div className="text-center py-8">Cargando asignaciones...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Mis Asignaciones</h2>
        
        {assignments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No tienes asignaciones pendientes
          </p>
        ) : (
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="border rounded-lg p-4 hover:bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">
                      Fecha: {new Date(assignment.date).toLocaleDateString('es-ES')}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Estado: {assignment.status === 'assigned' ? 'Asignado' : assignment.status}
                    </p>
                  </div>
                  
                  {assignment.status === 'assigned' && (
                    <div className="flex space-x-2">
                      <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm">
                        Confirmar
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm">
                        Rechazar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Confirmación Pública</h2>
        <p className="text-gray-600 mb-4">
          Si recibiste una notificación de asignación, puedes confirmar tu participación aquí:
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tu nombre completo
            </label>
            <input
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ingresa tu nombre completo"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Grupo
            </label>
            <input
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nombre de tu grupo"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Horario asignado
            </label>
            <input
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: Domingo 10:00 AM"
            />
          </div>
          
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
            Confirmar Participación
          </button>
        </div>
      </div>
    </div>
  );
}