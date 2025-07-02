'use client'
import { useState, useEffect } from 'react';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      try {
        const currentUser = await getCurrentUser();
        const attributes = await fetchUserAttributes();
        
        // Obtener el rol del usuario desde los grupos de Cognito
        const userRole = currentUser.signInDetails?.loginId?.includes('admin') ? 'Admin' : 'Member';
        
        setUser(currentUser);
        setRole(userRole);
      } catch (error) {
        console.log('No user signed in');
      } finally {
        setLoading(false);
      }
    }

    getUser();
  }, []);

  return { user, role, loading };
}