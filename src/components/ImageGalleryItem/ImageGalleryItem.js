import PropTypes from 'prop-types';

export default function ImageGalleryItem({ id, tag, pic, onClick }) {
  return (
    <li className="ImageGalleryItem">
      <img
        id={id}
        src={pic}
        alt={tag}
        className="ImageGalleryItem-image"
        onClick={() => onClick(id)}
      />
    </li>
  );
}

ImageGalleryItem.propsType = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  key: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
