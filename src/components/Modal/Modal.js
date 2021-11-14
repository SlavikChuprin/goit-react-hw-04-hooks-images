import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ pic, tag, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return function cleanup() {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">
        <img src={pic} alt={tag} />
      </div>
    </div>,

    modalRoot,
  );
}

Modal.propTypes = {
  dataForMadal: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};
