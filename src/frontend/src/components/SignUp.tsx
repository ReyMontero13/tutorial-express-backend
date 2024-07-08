// src/components/SignUp.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser, loginUser } from '../api/api';

const SignUp: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    try {
      let userId;
      if (isSignUp) {
        const user = await createUser(name, email);
        setSuccess('User created successfully!');
        userId = user.id;
        console.log('id',user.id)
      } else {
        const user = await loginUser(email, password);
        setSuccess('Logged in successfully!');
        userId = user.id;
      }
      setName('');
      setEmail('');
      setPassword('');
      navigate(`/users/${userId}`); // Navigate to /users/:id
    } catch (err: any) {
      setError(err.message || 'Failed to sign up / login');
    }
  };

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
    setError('');
    setSuccess('');
  };

  return (
    <div>
      <h1>{isSignUp ? 'Sign Up' : 'Login'}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        {isSignUp && (
          <div>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </div>
        )}
        <div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        {isSignUp && (
          <div>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
        )}
        <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
      </form>
      <button onClick={toggleForm}>
        {isSignUp ? 'Already have an account? Login' : 'Create an account'}
      </button>
    </div>
  );
};

export default SignUp;
