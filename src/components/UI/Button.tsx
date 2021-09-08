import '../../styles/UI/button.scss'

const Button = (props: any) => {
  return (
    <button
      className={`${props.disabled ? 'button-disabled' : ''}`}
      style={props.style}
      onClick={props.onClick}
      onMouseEnter={props.onMouseLeave}
      onMouseLeave={props.onMouseLeave}
      disabled={props.disabled}
    >
      {props.title}
    </button>
  );
};

export default Button
  ;

