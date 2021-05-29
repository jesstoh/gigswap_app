import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { fetchTalentFav } from '../../slices/favouritesSlicer.js';

function TalentFav() {
  const dispatch = useDispatch();
  const { fav, status, error } = useSelector((state) => state.favourites);

  useEffect(() => {
    dispatch(fetchTalentFav());
  }, []);

  let content;

  if (status === 'loading') {
    content = (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  } else if (status === 'succeeded') {
    content = <div>Favorite container </div>;
  } else if (status === 'failed') {
    //Show error
    content = <span>{error}</span>;
  }

  return <Container className='mt-5'>{content}</Container>;

}

export default TalentFav;
