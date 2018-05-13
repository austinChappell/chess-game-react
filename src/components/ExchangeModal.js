import React from 'react';

const ExchangeModal = (props) => {
  const {
    exchange,
    message,
    pieces,
    selectedPiece,
  } = props;


  return (
    <div className="Modal">
      <div className="view-box">
        <h2>{message}</h2>
        <div className="pieces">
          {pieces.map((p, index) => {
            return (
              <div
                key={index}
                onClick={() => exchange(p, selectedPiece)}
                className="piece"
              >
                <img
                  alt={p.label}
                  src={p.icon}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default ExchangeModal;
