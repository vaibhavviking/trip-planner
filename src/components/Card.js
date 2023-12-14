import React from 'react';

const Card = ({ title, to, fare, timeToExplore }) => {
  const imageUrl = `https://source.unsplash.com/random/300x200/?landscape`;

  return (
    <div className="icard" style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="overlay">
        <h3>{to}</h3>
        <p className="extra-info">
          Fare: {fare} Rs <br></br>
          Time to Explore: {timeToExplore}
        </p>
      </div>
    </div>
  );
};

export default Card;