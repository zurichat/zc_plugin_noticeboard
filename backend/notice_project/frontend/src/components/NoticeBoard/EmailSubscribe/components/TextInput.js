import "./TextInput.css";

const TextInput = (props) => {
  return <input {...props} className={`${props.className ?? ""}`} />;
};

export default TextInput;
