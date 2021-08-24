import "../../styles/UI/input.scss";

const Input = (props: any) =>
  <input
    // value={props.value}
    name={props.name}
    value={props.value}
    onChange={props.onChange}
    type={props.type}
    placeholder={props.placeholder}
  />;


export default Input;
