'use client'
import { useState } from 'react';
import type { User } from '@/types';

export default function GroupMembers() {
  const [members, setMembers] = useState<User[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMember, setNewMember] = useState({
    username: '',
    email: '',
    age: ''
  });

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    
    const member: User = {
      id: Date.now().toString(),
      username: newMember.username,
      email: newMember.email,
      role: 'Member',
      age: newMember.age ? parseInt(newMember.age) : undefined
    };
    
    setMembers([...members, member]);
    setNewMember({ username: '', email: '', age: '' });
    setShowAddForm(false);
  };

  const handleRemoveMember = (memberId: string) => {
    setMembers(members.filter(m => m.id !== memberId));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Miembros del Grupo</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Agregar Miembro
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Agregar Nuevo Miembro</h3>
          
          <form onSubmit={handleAddMember} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre de Usuario
              </label>
              <input
                type="text"
                required
                value={newMember.username}
                onChange={(e) => setNewMember({...newMember, username: e.target.value})}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                required
                value={newMember.email}
                onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Edad (opcional)
              </label>
              <input
                type="number"
                value={newMember.age}
                onChange={(e) => setNewMember({...newMember, age: e.target.value})}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Agregar Miembro
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white border rounded-lg">
        {members.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No hay miembros en este grupo. Agrega el primer miembro para comenzar.
          </div>
        ) : (
          <div className="divide-y">
            {members.map((member) => (
              <div key={member.id} className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{member.username}</h3>
                  <p className="text-sm text-gray-600">{member.email}</p>
                  {member.age && (
                    <p className="text-sm text-gray-600">Edad: {member.age} años</p>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    Editar
                  </button>
                  <button 
                    onClick={() => handleRemoveMember(member.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-medium text-yellow-800 mb-2">Solicitudes de Transferencia</h3>
        <p className="text-sm text-yellow-700">
          Aquí aparecerán las solicitudes de transferencia de miembros que no cumplan 
          con las restricciones de edad del grupo.
        </p>
      </div>
    </div>
  );
}