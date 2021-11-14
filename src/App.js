import { useEffect, useState } from 'react';
import './App.css';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import picsAPI from './components/services/Pixabay-api';
import LoaderPics from './components/Loader';
import Button from './components/Button/';
import Modal from './components/Modal';
import NotFound from './components/NotFound';

function App() {
  const [request, setRequest] = useState('');
  const [pics, setPics] = useState([]);
  const [picForModal, setpicForModal] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!request) {
      return;
    }
    setPics([]);

    fetchPic(request, 1);
  }, [request]);

  useEffect(() => {
    if (!request) {
      return;
    }
    if (page !== 1) {
      fetchPic(request, page);
    }
  }, [page, request]);

  const fetchPic = (request, page) => {
    setIsError(false);
    setIsLoading(true);
    picsAPI
      .fetchPictures(request, page)
      .then(res => {
        setIsLoading(true);
        if (res.total === 0) {
          setIsError(true);
        }
        return res;
      })
      .then(res => {
        res.hits.map(({ id, webformatURL, largeImageURL }) =>
          setPics(state => [...state, { id, webformatURL, largeImageURL }]),
        );
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => {
        setIsError(error);
      })
      .finally(setIsLoading(false));
  };

  const submitData = request => {
    setRequest(request);
  };
  const onPageChange = () => {
    setPage(state => state + 1);
  };

  const onModalToggle = () => {
    setShowModal(!showModal);
  };
  const onClickLargeImage = id => {
    setpicForModal(pics.find(pic => pic.id === id).largeImageURL);
    onModalToggle();
  };

  return (
    <div className="App">
      <Searchbar onSubmit={submitData} />
      {request === '' && <div> There will be pictures for you request...</div>}
      {isError && <NotFound request={request} />}
      <div>
        {pics.length !== 0 && (
          <ImageGallery
            tag={request}
            onClickForModal={onClickLargeImage}
            pics={pics}
          />
        )}
        {isLoading && <LoaderPics />}
        {pics.length >= 12 && <Button onClick={onPageChange} />}
      </div>
      {showModal && (
        <Modal pic={picForModal} tag={request} onClose={onModalToggle} />
      )}
    </div>
  );
}

export default App;
