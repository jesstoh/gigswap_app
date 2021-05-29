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
    // ['in_progress', 'In progress'],
    // ['not_paid', 'Pending payment'],
    // ['completed', 'Completed'],
  ];
  console.log(fav['applied']);


  return (
    <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
      {keySelections.map(([currentKey, title]) => {
        return (
          <Tab eventKey={currentKey} title={title}>
            {fav[currentKey].map((gig) => (
              <SmallGigExcerpt gig={gig} />
            ))}
          </Tab>
        );
      })}
    </Tabs>
  );
}

export default TalentFavList;
