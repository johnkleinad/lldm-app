'use client'
import { useState } from 'react';

export default function ConfirmPage() {
  const [formData, setFormData] = useState({
    name: '',
    group: '',
    timeSlot: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Aquí harías la llamada a la API para confirmar la asignación
      // const response = await api.confirmPublicAssignment(formData);
      
      // Simulación de éxito
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('success');
      setMessage('¡Tu participación ha sido confirmada exitosamente!');
      setFormData({ name: '', group: '', timeSlot: '' });
    } catch (error) {
      setStatus('error');
      setMessage('Error al confirmar la participación. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Confirmar Participación
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Confirma tu asignación para el evento
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow rounded-lg">
          {status === 'success' ? (
            <div className="text-center">
              <div className="text-green-600 text-6xl mb-4">✓</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                ¡Confirmación Exitosa!
              </h3>
              <p className="text-gray-600 mb-4">{message}</p>
              <button
                onClick={() => {
                  setStatus('idle');
                  setMessage('');
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Confirmar Otra Asignación
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nombre Completo
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2 border"
                  placeholder="Tu nombre completo"
                />
              </div>

              <div>
                <label htmlFor="group" className="block text-sm font-medium text-gray-700">
                  Grupo
                </label>
                <input
                  id="group"
                  type="text"
                  required
                  value={formData.group}
                  onChange={(e) => setFormData({...formData, group: e.target.value})}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2 border"
                  placeholder="Nombre de tu grupo"
                />
              </div>

              <div>
                <label htmlFor="timeSlot" className="block text-sm font-medium text-gray-700">
                  Horario Asignado
                </label>
                <input
                  id="timeSlot"
                  type="text"
                  required
                  value={formData.timeSlot}
                  onChange={(e) => setFormData({...formData, timeSlot: e.target.value})}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2 border"
                  placeholder="Ej: Domingo 15 de Diciembre - Mañana"
                />
              </div>

              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <p className="text-red-800 text-sm">{message}</p>
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-md font-medium"
                >
                  {status === 'loading' ? 'Confirmando...' : 'Confirmar Participación'}
                </button>
                
                <button
                  type="button"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-medium"
                >
                  Rechazar
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            Si tienes problemas para confirmar tu participación, contacta al administrador.
          </p>
        </div>
      </div>
    </div>
  );
}