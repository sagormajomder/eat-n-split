function Friend({ friend, selectedFriendObj, onSelectFriend }) {
  const { id, fullName, image, owe } = friend;
  const isSelected = id === selectedFriendObj?.id;

  // console.log(friend);
  let content = '';
  if (owe == 0) content = `You and ${fullName} are even`;
  else if (owe > 0) content = `${fullName} owes you $${Math.abs(owe)}`;
  else if (owe < 0) content = `You owe ${fullName} $${Math.abs(owe)}`;

  function handleIsSelect() {
    onSelectFriend(friend);
  }

  return (
    <li className={`friend ${isSelected ? 'active' : ''}`}>
      <img src={image} alt='Friend' />
      <div className='intro'>
        <h3>{fullName}</h3>
        <p className={owe > 0 ? 'green-text' : owe < 0 ? 'red-text' : ''}>
          {content}
        </p>
      </div>
      <button onClick={handleIsSelect} type='button'>
        {isSelected ? 'Close' : 'Select'}
      </button>
    </li>
  );
}

export default Friend;
