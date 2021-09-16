import '../../styles/grid-items/grid-tile.css';

interface Image {
  borderColor: string,
  borderWidth: number,
  image: string,
  title: string
  onClick: any
}

const GridTile = ({
  borderColor,
  borderWidth,
  image,
  onClick,
  title, }: Image): any => {
  return (
    <li>
      <div onClick={onClick} className='categories-item' >
        <div className='categories-item__image-container'  >
          <img
            src={image}
            alt="images for categories"
            style={{ borderColor, borderWidth }}
          />
        </div>
        <span className='categories-item__title'>{title}</span>
      </div>
    </li>
  )
}

export default GridTile;