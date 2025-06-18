import React from 'react'

export const LoginPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  return (
    <div className='login-page'>
        <h2>Login</h2>
        <form onSubmit={() => {}}>
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
        </form>
    </div>
  )
}
