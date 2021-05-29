import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { fetchTalentFav } from '../../slices/favouritesSlicer.js';
import TalentFavList  from '../../components/talents/TalentFavList'

function TalentFavPage() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.favourites);

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
    content = <TalentFavList />;
  } else if (status === 'failed') {
    //Show error
    content = <span>{error}</span>;
  }

  return <Container className='mt-5'>{content}</Container>;

}

export default TalentFavPage;
