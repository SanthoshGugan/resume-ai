import React from 'react';
import { Badge } from 'react-bootstrap';

const Avatar = ({ initials }) => {
    return (
      <Badge
        pill
        bg="primary"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '20px',
          height: '20px',
          borderRadius: '30%',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          border:"0.5px"
        }}
      >
        {initials}
      </Badge>
    );
  };
  export default Avatar;