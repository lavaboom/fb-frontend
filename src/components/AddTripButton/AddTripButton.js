// React modules
import React from 'react';
import { Link } from 'react-router-dom';
// app styles & assets
import './AddTripButton.scss';
// 3rd parties libraries
import Icon from '@mdi/react'
import { mdiPlus } from '@mdi/js'

export default function AddTripButton() {
  return (
    <Link to='/addtrip' className='link'>
        <button className='link-button'>
        <Icon path={ mdiPlus } title='Add' size={1} horizontal vertical color='white'/>
        <div>Add A New Trip</div>
    </button>
    </Link>
  );
}
