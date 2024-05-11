import { useState } from 'react';

function Login({ users, onIsLogin, children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCorrect, setIsCorrect] = useState(true);

  // console.log('render');

  function handleEmail(e) {
    setEmail(e.target.value.toLowerCase());
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (users.find(u => u.email !== email || u.password !== password)) {
      setIsCorrect(false);
      return;
    }

    const user = users.find(u => u.email === email && u.password === password);
    user ? onIsLogin(true) : onIsLogin(false);

    // reset
    setEmail('');
    setPassword('');
  }

  return (
    <>
      <h1>Sign in</h1>
      <form className='auth-form' onSubmit={handleFormSubmit}>
        <div className='auth-div'>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            id='email'
            placeholder='Enter your email'
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div className='auth-div auth-pass'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            placeholder='Enter your password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <span>Forgot password?</span>
        </div>
        <button type='submit'>Sign In</button>
      </form>
      {!isCorrect ? (
        <p className='user-exist'>
          User email or password is incorrect.Please try again!
        </p>
      ) : (
        <p>&nbsp;</p>
      )}
      {children}
    </>
  );
}

export default Login;
