import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Col } from 'react-bootstrap';
import { saveTalent } from '../../slices/favouritesSlicer';

function TalentButtons() {
  const dispatch = useDispatch();
  const { talent } = useSelector((state) => state.talents.activeTalent);
  const savedTalents = useSelector(
    (state) => state.favourites.fav.saved_talents_list
  );
  const status = useSelector((state) => state.favourites.status);

  let content;

  if (status === 'succeeded') {
    content = (
      <Col className="text-center">
        {savedTalents.includes(talent.talent_profile.id) ? (
          <Button className="mr-3 px-4 " variant="light rounded-pill">
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

        <Button variant="outline-primary px-4 rounded-pill"> Invite </Button>
      </Col>
    );
  } else {
    content = null;
  }

  return <React.Fragment>{content}</React.Fragment>;
}

export default TalentButtons;
