import { useState } from 'react';
import InputField from '../common/InputField';

function RightSide({ friendObj, onSplitBill }) {
  const [bill, setBill] = useState('');
  const [paidByUser, setPaidByUser] = useState('');
  const paidByFriend = bill ? bill - paidByUser : '';
  const [whoisPaying, setWhoisPaying] = useState('user');

  const { fullName } = friendObj;
  const firstName = fullName.split(' ')[0];

  function handleBill(e) {
    setBill(Number(e.target.value));
  }
  function handlePaidByUser(e) {
    setPaidByUser(
      Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
    );
  }

  function handleWhoIsPaying(e) {
    setWhoisPaying(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;
    onSplitBill(whoisPaying === 'user' ? paidByFriend : -paidByUser);

    // Reset Form
    // setBill('');
    // setPaidByUser('');
    // setWhoisPaying('user');
  }

  return (
    <form className='form right-side' onSubmit={handleFormSubmit}>
      <h2>Split a bill with {fullName}</h2>
      <InputField forLabel='f-bill' value={bill} onEvent={handleBill}>
        <label htmlFor='f-bill'>💰 Bill value:</label>
      </InputField>
      <InputField
        forLabel='my-expense'
        value={paidByUser}
        onEvent={handlePaidByUser}>
        <label htmlFor='my-expense'>🧍‍♂️ Your expense:</label>
      </InputField>
      <InputField forLabel='f-expense' value={paidByFriend}>
        <label htmlFor='f-expense'>👫 {firstName}&apos;s expense:</label>
      </InputField>
      <div className='input'>
        <label htmlFor='bill-pay'>🤑 Who is paying the bill?</label>
        <select id='bill-pay' value={whoisPaying} onChange={handleWhoIsPaying}>
          <option value='user'>You</option>
          <option value='friend'>{fullName}</option>
        </select>
      </div>
      <button type='submit'>Split bill</button>
    </form>
  );
}

export default RightSide;
