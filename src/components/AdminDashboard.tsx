'use client'
import { useState } from 'react';
import Calendar from './Calendar';
import GroupManagement from './GroupManagement';

interface AdminDashboardProps {
  user: any;
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'calendar' | 'groups'>('calendar');

  const tabs = [
    { id: 'calendar', name: 'Calendario', icon: '📅' },
    { id: 'groups', name: 'Grupos', icon: '👥' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'calendar' && <Calendar userRole="Admin" />}
          {activeTab === 'groups' && <GroupManagement />}
        </div>
      </div>
    </div>
  );
}