import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Signup({ users, onUsers, onIsSignup, children }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isUserExist, setIsUserExist] = useState(false);

  function handleEmail(e) {
    setEmail(function () {
      if (users.find(u => u.email === e.target.value.toLowerCase())) {
        setIsUserExist(true);
      } else {
        setIsUserExist(false);
      }
      return e.target.value.toLowerCase();
    });
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (users.find(u => u.email === email)) return;

    const newUser = {
      id: uuidv4(),
      fullName,
      email,
      password,
    };
    onUsers(newUser);
    onIsSignup();

    // reset
    setFullName('');
    setEmail('');
    setPassword('');
  }
  return (
    <>
      <h1>Sign up</h1>
      <form className='auth-form' onSubmit={handleFormSubmit}>
        <div className='auth-div'>
          <label htmlFor='f-name'>Full Name</label>
          <input
            type='text'
            id='f-name'
            placeholder='Enter your full name'
            value={fullName}
            onChange={e => setFullName(e.target.value)}
          />
        </div>
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
        <div className='auth-div'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            placeholder='Enter your password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type='submit'>Sign up</button>
      </form>
      {isUserExist ? (
        <p className='user-exist'>User already exist! Try different email </p>
      ) : (
        <p>&nbsp;</p>
      )}

      {children}
    </>
  );
}

export default Signup;
