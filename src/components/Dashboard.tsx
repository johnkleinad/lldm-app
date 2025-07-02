'use client'
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import AdminDashboard from './AdminDashboard';
import CoordinatorDashboard from './CoordinatorDashboard';
import MemberDashboard from './MemberDashboard';

interface DashboardProps {
  user: any;
  signOut: () => void;
}

export default function Dashboard({ user, signOut }: DashboardProps) {
  const { role, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  const renderDashboard = () => {
    switch (role) {
      case 'Admin':
        return <AdminDashboard user={user} />;
      case 'Coordinator':
        return <CoordinatorDashboard user={user} />;
      default:
        return <MemberDashboard user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Sistema de Asignaciones
              </h1>
              <p className="text-sm text-gray-600">
                Bienvenido, {user?.username} ({role})
              </p>
            </div>
            <button
              onClick={signOut}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {renderDashboard()}
      </main>
    </div>
  );
}