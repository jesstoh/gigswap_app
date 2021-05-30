import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Col } from 'react-bootstrap';
import { saveTalent, unsaveTalent } from '../../slices/favouritesSlicer';
import Axios from '../../utilz/Axios.js';

function TalentButtons() {
  const dispatch = useDispatch();
  const { talent } = useSelector((state) => state.talents.activeTalent);
  const savedTalents = useSelector(
    (state) => state.favourites.fav.saved_talents_list
  );
  const status = useSelector((state) => state.favourites.status);

  const [errorMessage, setErrorMessage] = useState(null); // Storing error message
  const [gigId, setGigId] = useState(''); // Store gig id that hirer select to invite talent
  const [successMessage, setSuccessMessage] = useState(null);

  //Api call to invite talent
  async function inviteTalent() {
    try {
      const response = await Axios.put(
        `${process.env.REACT_APP_API_URL}/api/gigs/${gigId}/invite/`,
        { talent: talent.id }
      );
      setSuccessMessage(response.data.detail);
    } catch (err) {
      setErrorMessage(err.response.data.detail);
    }
  }

  let content;

  if (status === 'succeeded') {
    content = (
      <>
        {savedTalents.includes(talent.talent_profile.id) ? (
          <Button
            className="mr-3 px-4 "
            variant="light rounded-pill"
            onClick={() => {
              dispatch(
                unsaveTalent({
                  talentId: talent.id,
                  profileId: talent.talent_profile.id,
                })
              );
            }}
          >
            Unsave
          </Button>
        ) : (
          <Button
            className="mr-3 px-4 "
            variant="primary rounded-pill"
            onClick={() => {
              dispatch(
                saveTalent({
                  talentId: talent.id,
                  profileId: talent.talent_profile.id,
                })
              );
            }}
          >
            Save
          </Button>
        )}
      </>
    );
  } else {
    content = (
      <Button className="mr-3 px-4 text-light " variant="light rounded-pill" disabled>
        Unsave
      </Button>
    );
  }

  return <React.Fragment>{content}</React.Fragment>;
}

export default TalentButtons;
