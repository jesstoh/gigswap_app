import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Spinner } from 'react-bootstrap';
import { fetchHirerFav } from '../../slices/favouritesSlicer.js';
import HirerFavGigsList from '../../components/hirers/HirerFavGigsList';

function HirerFavPage() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.favourites);

  useEffect(() => {
    dispatch(fetchHirerFav());
  }, []);

  let content;

  if (status === 'loading') {
    content = (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  } else if (status === 'succeeded') {
    content = <HirerFavGigsList />;
  } else if (status === 'failed') {
    //Show error
    content = <span>{error}</span>;
  }

  return <Container className="mt-5">{content}</Container>;
}

export default HirerFavPage;
