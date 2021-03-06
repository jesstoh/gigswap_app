import React from 'react';
import { Table } from 'react-bootstrap';
import { parseISO, format } from 'date-fns';

function GigsTable({ gigs }) {
  return (
    <Table striped bordered hover className="mt-5 text-center">
      <thead>
        <tr>
          <th>No.</th>
          <th>Gig Title</th>
          <th>Expired Date</th>
          <th>Flag Count</th>
        </tr>
      </thead>
      <tbody>
        {gigs.map((gig, index) => {
          return (
            <tr key={gig.id}>
              <td>{index + 1}</td>
              <td>
                <a href={`/gigs/${gig.id}`} className="line-less">
                  {gig.title}{' '}
                </a>
              </td>
              <td>{format(parseISO(gig.expired_at), 'd MMM yyyy')}</td>
              <td>{gig.flag_count}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default GigsTable;
