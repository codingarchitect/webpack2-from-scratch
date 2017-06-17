import React from 'react';
import maginus from 'images/maginus.png';
import alibabaAmazon from 'images/alibaba-amazon.jpg';
import payPerClick from 'images/pay-per-click.gif';

const greeting = () =>
  (<div className="container">
    <div className="image-wrapper">
      <img src={maginus} className="image-wrapper__image" alt="maginus" />
    </div>
    <div className="image-wrapper">
      <img src={alibabaAmazon} className="image-wrapper__image" alt="alibaba amazon" />
    </div>
    <div className="image-wrapper">
      <img src={payPerClick} className="image-wrapper__image" alt="pay per click" />
    </div>
  </div>);

export default greeting;
