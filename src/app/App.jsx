import React, { Component } from 'react';
import maginus from 'images/maginus';
import alibabaAmazon from 'images/alibaba-amazon';
import payPerClick from 'images/pay-per-click';

const greeting = () => {
  return (
    <div className="container">
      <div className="image-wrapper">
        <img src={maginus} className="image-wrapper__image" alt="maginus"/>
      </div>
      <div className="image-wrapper">
        <img src={alibabaAmazon} className="image-wrapper__image" alt="alibaba amazon"/>
      </div>
      <div className="image-wrapper">
        <img src={payPerClick} className="image-wrapper__image" alt="pay per click"/>
      </div>
    </div>
  );
};

export default greeting;