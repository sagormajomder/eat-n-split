import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import InputField from '../Common/InputField';

function FriendForm({ onAddFriends, onShowAddFriend }) {
  const [friendName, setFriendName] = useState('');
  const [image, setImage] = useState('');

  const imageURL = 'https://randomuser.me/api/?gender=male';

  async function getRandomUserPic() {
    try {
      const res = await fetch(imageURL);
      const data = await res.json();
      setImage(
        data.results
          .map(item => item.picture)
          .map(p => p.large)
          .join()
      );
      // console.log(
      //   data.results
      //     .map(item => item.picture)
      //     .map(p => p.large)
      //     .join()
      // );
    } catch (error) {
      console.log(error.message);
    }
  }

  useState(function () {
    getRandomUserPic();
  }, []);

  function handleFriendName(e) {
    setFriendName(e.target.value);
  }
  function handleFormSubmit(e) {
    e.preventDefault();
    getRandomUserPic();

    if (!friendName || !image) return;

    const newFriend = {
      id: uuidv4(),
      fullName: friendName,
      image,
      owe: 0,
      isSelect: false,
    };
    // console.log(newFriend);
    onAddFriends(newFriend);
    onShowAddFriend();
    // Reset form
    setFriendName('');
    setImage('');
  }

  return (
    <div className='friend-form'>
      <form className='form' onSubmit={handleFormSubmit}>
        <InputField
          forLabel='f-name'
          value={friendName}
          onEvent={handleFriendName}>
          <label htmlFor='f-name'>👫 Friend Name</label>
        </InputField>
        <InputField forLabel='f-image-url' value={imageURL}>
          <label htmlFor='f-image-url'>🌇 Image URL</label>
        </InputField>
        <button type='submit'>Add</button>
      </form>
    </div>
  );
}

export default FriendForm;
