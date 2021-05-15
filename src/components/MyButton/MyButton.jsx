const MyButton = ({ value, ...props }) => {
  return <button {...props}>{value}</button>;
};

export default MyButton;
