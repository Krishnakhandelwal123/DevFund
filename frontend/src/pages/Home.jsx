import React from 'react';
import { useAuthStore } from '../Store/AuthStore';

const Home = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
      <h2>Welcome{authUser && authUser.name ? `, ${authUser.name}` : ''}!</h2>
      <button onClick={logout} style={{ marginTop: '1rem', padding: '0.5rem 1.5rem', fontSize: '1rem', cursor: 'pointer' }}>
        Logout
      </button>
    </div>
  )
}

export default Home
