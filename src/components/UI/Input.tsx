import "../../styles/UI/input.scss";

const Input = (props: any) =>
  <div className='input__container' >
    <input
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      type={props.type}
      placeholder={props.placeholder}
      autoFocus={props.autoFocus}
    />
    <p className="input__error">{props.error}</p>
  </div>


export default Input;
