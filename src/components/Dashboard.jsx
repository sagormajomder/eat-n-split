import { useState } from 'react';
import FriendForm from './Left/FriendForm';
import Friends from './Left/Friends';
import LeftSide from './Left/LeftSide';
import RightSide from './Right/RightSide';

// const friendList = [
//   {
//     id: uuidv4(),
//     fullName: 'Mehedi Hasan',
//     image: '/images/f1.jpeg',
//     owe: -7,
//   },

//   {
//     id: uuidv4(),
//     fullName: 'Sumit Saha',
//     image: '/images/f2.jpeg',
//     owe: 20,
//   },
//   {
//     id: uuidv4(),
//     fullName: 'Joy Chowdhury',
//     image: '/images/f3.jpeg',
//     owe: 0,
//   },
// ];

function Dashboard() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState([]);
  const [selectedFriendObj, setSelectedFriendObj] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend(v => !v);
    setSelectedFriendObj(null);
  }

  function handleAddFriends(newFriend) {
    setFriends(f => [...f, newFriend]);
  }

  function handleSelectFriend(friend) {
    setSelectedFriendObj(curr => (curr?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriends(friends =>
      friends.map(friend =>
        friend.id === selectedFriendObj.id
          ? { ...friend, owe: friend.owe + value }
          : friend
      )
    );

    setSelectedFriendObj(null);
  }

  // useEffect(
  //   function () {
  //     setFriends(friendList);
  //   },
  //   [friendList]
  // );

  return (
    <div className='dashboard'>
      <div className='dashboard-container'>
        <LeftSide>
          <Friends
            friends={friends}
            selectedFriendObj={selectedFriendObj}
            onSelectFriend={handleSelectFriend}
          />
          {showAddFriend && (
            <FriendForm
              onAddFriends={handleAddFriends}
              onShowAddFriend={handleShowAddFriend}
            />
          )}
          <button onClick={handleShowAddFriend} type='button'>
            {showAddFriend ? 'Close' : 'Add friend'}
          </button>
        </LeftSide>
        {selectedFriendObj && (
          <RightSide
            key={selectedFriendObj.id}
            friendObj={selectedFriendObj}
            onSplitBill={handleSplitBill}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
