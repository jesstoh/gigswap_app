import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container} from 'react-bootstrap';
import { fetchTalents } from '../../slices/talentsSlice';
import TalentsList from '../../components/talents/TalentsList';

function TalentsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTalents());
  }, []);

  return (
    <div>
      <TalentsList />
    </div>
  );
}

export default TalentsPage;
