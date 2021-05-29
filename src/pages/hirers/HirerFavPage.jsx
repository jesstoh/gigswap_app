import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { fetchHirerFav } from '../../slices/favouritesSlicer.js';

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
    content = <div>Hirer Fav</div>;
  } else if (status === 'failed') {
    //Show error
    content = <span>{error}</span>;
  }

  return <Container className="mt-5">{content}</Container>;
}

export default HirerFavPage;
