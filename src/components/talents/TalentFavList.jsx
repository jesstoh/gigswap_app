import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import { fetchTalentFav } from '../../slices/favouritesSlicer.js';

function TalentFavList() {
  const fav = useSelector((state) => state.favourites.fav);
  const [key, setKey] = useState('Saved');
  const keySelections = [
    'Saved',
    'Applied',
    'Active',
    'Pending payment',
    'Completed',
  ];

  return (
    <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
      {keySelections.map((k) => {
        return (
          <Tab eventKey={k} title={k}>
            <p>{key}</p>
          </Tab>
        );
      })}
    </Tabs>
  );
}

export default TalentFavList;
