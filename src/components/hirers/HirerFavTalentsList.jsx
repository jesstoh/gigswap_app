import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import SmallTalentExcerpt from '../talents/SmallTalentExcerpt';
import TalentExcerptChat from '../talents/TalentExcerptChat';

function HirerFavTalentsList() {
  const fav = useSelector((state) => state.favourites.fav);
  const [key, setKey] = useState('saved');
  const keySelections = [
    ['saved', 'Saved Talents'],
    ['hired_talents', 'Hired'],
  ];

  // return (
  //   <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
  //     {keySelections.map(([currentKey, title]) => {
  //       return (
  //         <Tab eventKey={currentKey} title={title} key={currentKey}>
  //           {!fav[currentKey].length ? <div className='text-center mt-3'>No relevant gigs</div>: fav[currentKey].map((talent) => (
  //             <SmallTalentExcerpt talent={talent} key={talent.user.id} />
  //           ))}
  //         </Tab>
  //       );
  //     })}
  //   </Tabs>
  // );

  return (
    <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
      <Tab eventKey="saved" title="Saved Talent" key="saved">
        {!fav['saved'].length ? (
          <div className="text-center mt-3">No relevant gigs</div>
        ) : (
          fav['saved'].map((talent) => (
            <SmallTalentExcerpt talent={talent} key={talent.user.id} />
          ))
        )}
      </Tab>

      <Tab eventKey="hired_talents" title="Hired" key="hired_talents">
        {!fav['hired_talents'].length ? (
          <div className="text-center mt-3">No relevant gigs</div>
        ) : (
          fav['hired_talents'].map((talent) => (
            <TalentExcerptChat talent={talent} key={talent.user.id} />
          ))
        )}
      </Tab>
    </Tabs>
  );
}

export default HirerFavTalentsList;
