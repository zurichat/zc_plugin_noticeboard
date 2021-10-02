const Button = props => {
  const { buttonStyle = "filled", borderRadius = "10px" } = props;
  let styleObj = {};

  /* eslint-disable default-case */
  switch (buttonStyle) {
    case "outline":
      styleObj = {
        cursor: "pointer",
        padding: "0.7em",
        border: `1px solid`,
        borderRadius
      };
      break;

    case "filled":
      styleObj = {
        cursor: "pointer",
        padding: "0.7em",
        border: "none",
        borderRadius
      };
      break;
  }

  const nativeProps = { ...props };
  delete nativeProps.buttonStyle;
  delete nativeProps.borderRadius;

  return (
    <button style={styleObj} {...nativeProps}>
      {props.children}
    </button>
  );
};

export default Button;
