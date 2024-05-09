import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Footer from '../Common/Footer';

const userList = [
  {
    id: uuidv4(),
    email: 'sagormajomder@gmail.com',
    password: 'Sagor112',
  },
];

function Login({ onIsLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [correct, setCorrect] = useState(true);

  // console.log('render');

  function handleFormSubmit(e) {
    e.preventDefault();
    const user = userList.find(
      u => u.email === email && u.password === password
    );
    user ? onIsLogin(true) : onIsLogin(false);
    setCorrect(user ? true : false);
    // reset
    setEmail('');
    setPassword('');
  }

  return (
    <div className='login'>
      <div className='login-container'>
        <h1>Sign in</h1>
        <form className='login-form' onSubmit={handleFormSubmit}>
          <div className='login-email'>
            <label htmlFor='email'>Email Address</label>
            <input
              type='email'
              id='email'
              placeholder='Enter your email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='login-pass'>
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
        {!correct ? (
          <p className='user-exist'>User doesn&apos;t exist. Try again! </p>
        ) : (
          <p>&nbsp;</p>
        )}

        <Footer>
          <p>Don&apos;t have an account yet?</p>
          <button type='button'> Sign Up</button>
        </Footer>
      </div>
    </div>
  );
}

export default Login;
