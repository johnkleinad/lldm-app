'use client'
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';
import Dashboard from '@/components/Dashboard';

Amplify.configure(outputs);

export default function Home() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Dashboard user={user} signOut={signOut} />
      )}
    </Authenticator>
  );
}