import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Wrap } from '@chakra-ui/react';

export const Navigation = () => {
  return (
    <nav style={{ backgroundColor: '#f4f2f0' }} >
      <Wrap m={'10px'}>
        <Button 
          bg={'#00726d'}
          color={'#f4f2f0'}>
            <Link to="/">Events</Link>
        </Button>
        <Button
          bg={'#00726d'}
          color={'#f4f2f0'}>
            <Link to="/event/1">Event</Link>
        </Button>
      </Wrap>
    </nav>
  );
};
