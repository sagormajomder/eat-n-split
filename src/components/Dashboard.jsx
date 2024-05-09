import { useEffect, useState } from 'react';
import FriendForm from './Left/FriendForm';
import Friends from './Left/Friends';
import LeftSide from './Left/LeftSide';
import RightSide from './Right/RightSide';

function Dashboard({ friendList }) {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState([]);
  const [selectedFriendObj, setSelectedFriendObj] = useState(null);

  useEffect(
    function () {
      setFriends(friendList);
    },
    [friendList]
  );

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
