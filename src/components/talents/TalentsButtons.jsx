import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { saveTalent, unsaveTalent } from '../../slices/favouritesSlicer';

// Buttons for hirer to save & unsave buttons
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
