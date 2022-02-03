import React from 'react';
// app styles & assets
import './Loading.scss'
// 3rd parties libraries
import Icon from '@mdi/react'
import { mdiCogOutline } from '@mdi/js'

export default function Loading() {
  return (
    <main className='loading'>
        <Icon className='card__icon' path={ mdiCogOutline } title='Loading' color='crimson' size={5}/>
        <div>Loading...</div>
    </main>
  );
}
