const Button = ({ onClick = null, content = null }) => {
  return <button onClick={onClick}>{content}</button>;
};

export default Button;
