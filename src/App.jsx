import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Authentication from './components/Authentication/Authentication';
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/Signup';
import Footer from './components/Common/Footer';
import Dashboard from './components/Dashboard';

const userList = [
  {
    id: uuidv4(),
    fullName: 'Sagor Majomder',
    email: 'sagormajomder@gmail.com',
    password: 'Sagor112',
  },
];

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(true);
  const [users, setUsers] = useState([]);

  function handleIsLogin(value) {
    setIsLogin(value);
  }

  function handleIsSignup() {
    setIsSignup(v => !v);
  }

  function handleUsers(newUser) {
    setUsers(u => [...u, newUser]);
  }

  useEffect(
    function () {
      setUsers(userList);
    },
    [userList]
  );

  return (
    <div className='app'>
      {!isLogin && (
        <Authentication onUsers={handleUsers}>
          {isSignup && (
            <Login users={users} onIsLogin={handleIsLogin}>
              <Footer>
                <p>Don&apos;t have an account yet?</p>
                <button onClick={handleIsSignup} type='button'>
                  Sign Up
                </button>
              </Footer>
            </Login>
          )}
          {!isSignup && (
            <Signup
              users={users}
              onUsers={handleUsers}
              onIsSignup={handleIsSignup}>
              <Footer>
                <p>Already have an account?</p>
                <button onClick={handleIsSignup} type='button'>
                  Login
                </button>
              </Footer>
            </Signup>
          )}
        </Authentication>
      )}
      {isLogin && <Dashboard />}
    </div>
  );
}

export default App;
