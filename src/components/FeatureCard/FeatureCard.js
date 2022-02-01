import React from 'react';
// app styles & assets
import './FeatureCard.scss'
// 3rd party libraries
import Icon from '@mdi/react'

export default function FeatureCard({iconName, iconText, header, text}) {
  return (
    <div className='card'>
        <div className='card__icon-container'>
            <Icon className='card__icon' path={ iconName } title={ iconText } color='crimson' size={1}/>
        </div>
        <div className='card__subheader'>
            { header }
        </div>
        <div className='card__text'>
        { text }
        </div>
    </div>
  );
}
