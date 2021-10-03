import "./TextInput.css";

const TextInput = props => {
  return <input {...props} className={`${props.className ?? ""} "input"`} />;
};

export default TextInput;
