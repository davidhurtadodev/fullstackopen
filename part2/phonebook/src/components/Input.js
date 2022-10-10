export const Input = ({ text, value, onChangeFunction }) => {
  return (
    <div>
      {text} <input value={value} onChange={onChangeFunction} />
    </div>
  );
};
