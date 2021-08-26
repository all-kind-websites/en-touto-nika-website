import '../../styles/UI/button.scss'

const Button = (props: any) => {
  return (
    <button style={props.style} onClick={props.onClick}
      onMouseEnter={props.onMouseLeave}
      onMouseLeave={props.onMouseLeave} >
      {props.title}
    </button>
  );
};

export default Button
  ;
