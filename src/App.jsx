import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import FriendForm from './components/Left/FriendForm';
import Friends from './components/Left/Friends';
import LeftSide from './components/Left/LeftSide';
import RightSide from './components/Right/RightSide';

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
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState([]);
  const [selectedFriendObj, setSelectedFriendObj] = useState(null);

  useEffect(function () {
    setFriends(friendList);
  }, []);

  function handleShowAddFriend() {
    setShowAddFriend(v => !v);
  }

  function handleAddFriends(newFriend) {
    setFriends(f => [...f, newFriend]);
  }

  function handleSelectFriend(friend) {
    setSelectedFriendObj(curr => (curr?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    // setFriends(friends =>
    //   friends.map(friend => {
    //     if (friend.id === id) {
    //       if (whoisPaying === 'user') {
    //         friend.owe += paidByFriend;
    //       } else {
    //         friend.owe -= paidByUser;
    //       }
    //       return friend;
    //     } else return friend;
    //   })
    // );

    setFriends(friends =>
      friends.map(friend =>
        friend.id === selectedFriendObj.id
          ? { ...friend, owe: friend.owe + value }
          : friend
      )
    );

    setSelectedFriendObj(null);
  }

  return (
    <div className='app'>
      <div className='container'>
        <LeftSide>
          <Friends
            friends={friends}
            selectedFriendObj={selectedFriendObj}
            onSelectFriend={handleSelectFriend}
          />
          <FriendForm
            onAddFriends={handleAddFriends}
            onShowAddFriend={handleShowAddFriend}
            showAddFriend={showAddFriend}
          />
        </LeftSide>
        {selectedFriendObj && (
          <RightSide
            friendObj={selectedFriendObj}
            onSplitBill={handleSplitBill}
          />
        )}
      </div>
    </div>
  );
}

export default App;
