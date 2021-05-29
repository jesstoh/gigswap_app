import React, {  useState } from 'react';
import { useSelector } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import SmallTalentExcerpt from '../talents/SmallTalentExcerpt'

function HirerFavTalentsList() {
    const fav = useSelector((state) => state.favourites.fav);
    const [key, setKey] = useState('saved');
    const keySelections = [
      ['saved', 'Saved Talents'],
      ['hired_talents', 'Hired'],
    ];
  
    return (
      <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
        {keySelections.map(([currentKey, title]) => {
          return (
            <Tab eventKey={currentKey} title={title}>
              {!fav[currentKey].length ? <div className='text-center mt-3'>No relevant gigs</div>: fav[currentKey].map((talent) => (
                <SmallTalentExcerpt talent={talent} />
              ))}
            </Tab>
          );
        })}
      </Tabs>
    );
  }
  
  export default HirerFavTalentsList;