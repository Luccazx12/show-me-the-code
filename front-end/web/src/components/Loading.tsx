import Spinner from 'react-spinner-material';
import React from 'react';

export default function Loading() {
  return (
    <div
      style={{
        position: 'relative',
        left: '47%',
        width: '40px',
        height: '40px',
        top: '40vh',
      }}
    >
      <Spinner
        size={120}
        spinnercolor={'#334'}
        spinnerwidth={1}
        visible={true}
        radius={''}
        color={''}
        stroke={''}
      />
    </div>
  );
}
