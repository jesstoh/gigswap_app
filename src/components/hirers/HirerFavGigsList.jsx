import React, {  useState } from 'react';
import { useSelector } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import SmallGigExcerpt from '../gigs/SmallGigExcerpt';

function HirerFavGigsList() {
    const fav = useSelector((state) => state.favourites.fav);
    const [key, setKey] = useState('active_gigs');
    const keySelections = [
      ['active_gigs', 'Active Gigs'],
      ['pending_award_gigs', 'Pending Award'],
      ['awarded_gigs', 'Awarded'],
      ['not_paid_gigs', 'Pending payment'],
      ['completed_gigs', 'Completed'],
      ['closed_gigs', 'Archived'],
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
  
  export default HirerFavGigsList;
  