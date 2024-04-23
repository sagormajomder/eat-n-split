import Friend from './Friend';

function Friends({ friends, selectedFriendObj, onSelectFriend }) {
  return (
    <ul>
      {friends.map(friend => (
        <Friend
          key={friend.id}
          friend={friend}
          selectedFriendObj={selectedFriendObj}
          onSelectFriend={onSelectFriend}
        />
      ))}
    </ul>
  );
}

export default Friends;
