// React modules
import React from 'react';
// app styles & assets
import './AddTripButton.scss';
// 3rd parties libraries
import Icon from '@mdi/react'
import { mdiPlus } from '@mdi/js'

export default function AddTripButton() {
  return (
    <button className='button'>
        <Icon path={ mdiPlus } title='Add' size={1} horizontal vertical color='white'/>
        <div>Add A New Trip</div>
    </button>
  );
}
