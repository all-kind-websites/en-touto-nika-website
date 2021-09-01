

const LinkText = (props: any) => {
  return (
    <div>
      <h5 >Πηγή: </h5>
      <p>
        {props.children}
      </p>
    </div>
  );
};


export default LinkText;
