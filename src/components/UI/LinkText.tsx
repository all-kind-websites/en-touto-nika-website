import '../../styles/UI/link-text.css';

const LinkText = (props: any) => {
  return (
    <div className='link-text' >
      <h5 className='source' >Περισσότερα: </h5>
      <p>
        {props.children}
      </p>
    </div>
  );
};


export default LinkText;
