
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) router.push('/');
    else alert('Login failed.');
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 space-y-4">
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="input w-full" />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="input w-full" />
      <button type="submit" className="btn w-full">Login</button>
    </form>
  );
}

