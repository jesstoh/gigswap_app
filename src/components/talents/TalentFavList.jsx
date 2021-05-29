import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import { fetchTalentFav } from '../../slices/favouritesSlicer.js';
import SmallGigExcerpt from '../gigs/SmallGigExcerpt';

function TalentFavList() {
  const fav = useSelector((state) => state.favourites.fav);
  const [key, setKey] = useState('saved');
  const keySelections = [
    ['saved', 'Saved'],
    ['applied', 'Applied'],
    ['invited', 'invited'],
    ['in_progress', 'In progress'],
    ['not_paid', 'Pending payment'],
    ['completed', 'Completed'],
  ];

  return (
    <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
      {keySelections.map(([currentKey, title]) => {
        return (
          <Tab eventKey={currentKey} title={title}>
            {!fav[currentKey].length ? <div className='text-center mt-3'>No relevant gigs</div>: fav[currentKey].map((gig) => (
              <SmallGigExcerpt gig={gig} />
            ))}
          </Tab>
        );
      })}
    </Tabs>
  );
}

export default TalentFavList;
