import '../../styles/UI/link-text.scss';

const LinkText = (props: any) => {
  return (
    <div className='link-text' >
      <h5 className='source' >Πηγή: </h5>
      <p>
        {props.children}
      </p>
    </div>
  );
};


export default LinkText;
