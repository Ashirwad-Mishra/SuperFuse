import React, { useState } from 'react';

const SignUp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('http://localhost:8080/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();
    if (res.ok) {
      alert('Account created! You can now log in.');
    } else {
      alert(data.message || 'Signup failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <h2>Create Your Account</h2>
        <p className="auth-subtitle">Join theSuperFuse family today!</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" required value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="auth-button">Sign Up</button>
        </form>
        <div className="auth-switch">
          <p>Already have an account? <a href="/login">Log In</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;