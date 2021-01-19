import React from 'react';
import logo from '../logo.svg';

const Page1 = ({onRouteChange}) => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title" >Welcome to React</h1>
    </header>
    <button className='disabled'>Page 1</button>
    <button onClick={() => onRouteChange('page2')}>Page 2</button>
    <button onClick={() => onRouteChange('page3')}>Page 3</button>
    <button onClick={() => onRouteChange('page4')}>Page4</button> 
  </div>
);

export default Page1;
