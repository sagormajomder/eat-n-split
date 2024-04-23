function InputField({ forLabel, value, onEvent, children }) {
  return (
    <div className='input'>
      {children}
      <input
        value={value}
        onChange={onEvent}
        disabled={forLabel === 'f-expense' && true}
        readOnly={forLabel === 'f-image-url'}
        type='text'
        id={forLabel}
      />
    </div>
  );
}

export default InputField;
