import React, { useState } from 'react';
import './AuthForms.css';

// --- THIS IS THE FIX ---
// We add an interface to define the props this component expects.
interface AuthFormsProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const AuthForms: React.FC<AuthFormsProps> = ({ setIsLoggedIn }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  
  // State for the login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // State for the signup form
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');


  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token); // Save JWT token
        setIsLoggedIn(true); // This updates the state in App.tsx
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
        console.error("Login error:", error);
        alert("Could not connect to the server.");
    }
  };
  
  // You can create a handleSignUpSubmit function here later

  return (
    <div className="auth-forms-container">
      <div className="auth-tabs">
        <button
          className={`tab ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => setActiveTab('login')}
        >
          Login
        </button>
        <button
          className={`tab ${activeTab === 'signup' ? 'active' : ''}`}
          onClick={() => setActiveTab('signup')}
        >
          Sign Up
        </button>
      </div>

      <div className="auth-content">
        {activeTab === 'login' ? (
          <form className="auth-form" onSubmit={handleLoginSubmit}>
            <h3>Welcome Back!</h3>
            <div className="input-group">
              <label htmlFor="login-email">Email</label>
              <input type="email" id="login-email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
            </div>
            <div className="input-group">
              <label htmlFor="login-password">Password</label>
              <input type="password" id="login-password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
            </div>
            <button type="submit" className="auth-button">Login</button>
          </form>
        ) : (
          <form className="auth-form" /* onSubmit={handleSignUpSubmit} */>
            <h3>Create Your Account</h3>
            {/* Add inputs and state for signup form */}
            <button type="submit" className="auth-button">Sign Up</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthForms;