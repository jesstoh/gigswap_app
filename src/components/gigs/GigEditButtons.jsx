import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Col, Modal, ListGroup, Alert } from 'react-bootstrap';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { parseISO } from 'date-fns';
import { toggleGigEdit } from '../../slices/gigsSlice';
import Axios from '../../utilz/Axios.js';
import { useHistory } from 'react-router-dom';

function GigEditButtons() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAdmin = useSelector((state) => state.authentication.isAdmin);
  const user = useSelector((state) => state.authentication.user);
  const gig = useSelector((state) => state.gigs.activeGig.gig);

  //Deleting gig
  async function handleDeleteGig() {
    try {
      const response = await Axios.delete(
        `${process.env.REACT_APP_API_URL}/api/gigs/${gig.id}/`
      );
      history.push('/');
    } catch (err) {
      console.log(err.response);
    }
  }

  let content;

  //Only can edit or delete active gig
  if (!gig.winner && !gig.is_closed && (parseISO(gig.expired_at) > new Date())) {
    // Check if login hirer is owner of gig
    if (user.id === gig.poster) {
      content = (
        <>
          <div
            onClick={() => dispatch(toggleGigEdit())}
            className="btn text-primary"
          >
            <FaRegEdit />
          </div>
          <div className="btn text-primary" onClick={handleDeleteGig}>
            <FaTrashAlt />
          </div>
        </>
      );
    } else if (user.isAdmin) {
      content = (
        <div className="btn text-primary" onClick={handleDeleteGig}>
          <FaTrashAlt />
        </div>
      );
    }
  }

  return <Col className="text-right">{content}</Col>;
}

export default GigEditButtons;
