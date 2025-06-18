import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider/AuthProvider';

export const LoginPage = () => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  const { login } = useAuth();
  const navigate = useNavigate();


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      console.error(error);
    }
  }
  
  return (
    <div className='login-page'>
        <h2>Login</h2>
        <Link to="/signup">Don't have an account? Sign up</Link>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />  
          <button type="submit">Login</button>
          {error && <p className="error">{error}</p>}
        </form>
    </div>
  )
}
