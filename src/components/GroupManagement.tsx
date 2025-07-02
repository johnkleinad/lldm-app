'use client'
import { useState } from 'react';
import type { Group } from '@/types';

export default function GroupManagement() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: '',
    coordinatorId: '',
    minAge: '',
    maxAge: ''
  });

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    
    const group: Group = {
      id: Date.now().toString(),
      name: newGroup.name,
      coordinatorId: newGroup.coordinatorId,
      minAge: newGroup.minAge ? parseInt(newGroup.minAge) : undefined,
      maxAge: newGroup.maxAge ? parseInt(newGroup.maxAge) : undefined,
      members: []
    };
    
    setGroups([...groups, group]);
    setNewGroup({ name: '', coordinatorId: '', minAge: '', maxAge: '' });
    setShowCreateForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Gestión de Grupos</h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Crear Grupo
        </button>
      </div>

      {showCreateForm && (
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Crear Nuevo Grupo</h3>
          
          <form onSubmit={handleCreateGroup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre del Grupo
              </label>
              <input
                type="text"
                required
                value={newGroup.name}
                onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ID del Coordinador
              </label>
              <input
                type="text"
                required
                value={newGroup.coordinatorId}
                onChange={(e) => setNewGroup({...newGroup, coordinatorId: e.target.value})}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Edad Mínima (opcional)
                </label>
                <input
                  type="number"
                  value={newGroup.minAge}
                  onChange={(e) => setNewGroup({...newGroup, minAge: e.target.value})}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Edad Máxima (opcional)
                </label>
                <input
                  type="number"
                  value={newGroup.maxAge}
                  onChange={(e) => setNewGroup({...newGroup, maxAge: e.target.value})}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Crear Grupo
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4">
        {groups.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No hay grupos creados. Crea el primer grupo para comenzar.
          </div>
        ) : (
          groups.map((group) => (
            <div key={group.id} className="bg-white border rounded-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium">{group.name}</h3>
                  <p className="text-sm text-gray-600">
                    Coordinador: {group.coordinatorId}
                  </p>
                  {(group.minAge || group.maxAge) && (
                    <p className="text-sm text-gray-600">
                      Edad: {group.minAge || 0} - {group.maxAge || '∞'} años
                    </p>
                  )}
                  <p className="text-sm text-gray-600">
                    Miembros: {group.members.length}
                  </p>
                </div>
                
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    Editar
                  </button>
                  <button className="text-red-600 hover:text-red-800 text-sm">
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}