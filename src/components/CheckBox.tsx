import '../styles/UI/checkbox.css';

export interface CheckBoxProps {
  text: string,
  checked: boolean,
  onChange: React.ChangeEventHandler<HTMLInputElement>,
  // onClick: Function
}

const CheckBox: React.SFC<CheckBoxProps> = (props: CheckBoxProps) => {
  return (
    <div className='checkbox' >
      <label className='container' >
        <span className='checkbox-label' >
          {props.text}
        </span>
        <input type="checkbox" checked={props.checked} onChange={props.onChange} />
        <span className='checkmark' ></span>
      </label>
    </div>);
}

export default CheckBox;