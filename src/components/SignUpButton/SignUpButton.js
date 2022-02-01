// React modules
import React from 'react';
import { Link } from 'react-router-dom';
// app styles & assets
import './SignUpButton.scss'

export default function SignUpButton() {
  return (
    <div>
        <Link to={ '/signup'}>
          <button className='fixed-navbar__button fixed-navbar__button--signup'>
              Sign up
          </button>
        </Link>
    </div>
  );
}
