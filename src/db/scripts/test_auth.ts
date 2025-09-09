import { SupabaseClient } from '../supabase/client'
import { useAuthStore } from '../store/useAuthStore'


// Create a simple store instance to mimic Zustand
const authStore = useAuthStore.getState();

// Helper functions (adapted from your hooks)
async function signUp(email: string, password: string) {
  const { data, error } = await SupabaseClient.auth.signUp({ email, password });
  if (error) throw error;
  console.log('SignUp success:', data);
  if (data.session) authStore.setSession(data.session, data.session.user);
  return data;
}

async function signIn(email: string, password: string) {
  const { data, error } = await SupabaseClient.auth.signInWithPassword({ email, password });
  if (error) throw error;
  console.log('SignIn success:', data);
  if (data.session) authStore.setSession(data.session, data.session.user);
  return data;
}

async function signOut() {
  const { error } = await SupabaseClient.auth.signOut();
  if (error) throw error;
  console.log('SignOut success');
  authStore.clear();
}

// Test script
async function testAuthFlow() {
  

  try {
    const email = 'alecalanjackson@gmail.com';
    const password = 'password';

    console.log('--- Signing up ---');
     await signUp(email, password);

    console.log('--- Signing in ---');
    await signIn(email, password);

    console.log('Current session:', authStore.session);
    console.log('Current user:', authStore.user);

    console.log('--- Signing out ---');
    await signOut();

    console.log('Session after sign out:', authStore.session);
    console.log('User after sign out:', authStore.user);

  } catch (err) {
    console.error('Auth test error:', err);
  }
}

testAuthFlow();