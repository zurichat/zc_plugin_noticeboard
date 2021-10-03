import classes from "./EmailSubscription.module.css";

const Modal = (props) => {
  return (
    <div onClick={props.closeHandler}>
      <div className="flex-column" onClick={(e) => e.stopPropagation()}>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
