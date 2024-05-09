import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Dashboard from './components/Dashboard';
import Login from './components/Login/Login';

const friendList = [
  {
    id: uuidv4(),
    fullName: 'Mehedi Hasan',
    image: '/images/f1.jpeg',
    owe: -7,
  },

  {
    id: uuidv4(),
    fullName: 'Sumit Saha',
    image: '/images/f2.jpeg',
    owe: 20,
  },
  {
    id: uuidv4(),
    fullName: 'Joy Chowdhury',
    image: '/images/f3.jpeg',
    owe: 0,
  },
];

function App() {
  const [isLogin, setIsLogin] = useState(false);
  function handleIsLogin(value) {
    setIsLogin(value);
  }
  return (
    <div className='app'>
      {!isLogin && <Login onIsLogin={handleIsLogin} />}
      {isLogin && <Dashboard friendList={friendList} />}
    </div>
  );
}

export default App;
