import classes from "./EmailSubscription.module.css";

const Modal = props => {
  return (
    <div className={`flex ${classes.bg}`} onClick={props.closeHandler}>
      <div className="flex-column" onClick={e => e.stopPropagation()}>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
