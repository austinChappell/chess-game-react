import React from 'react';

const Modal = props => (
  <div className={props.show ? 'Modal' : 'hide'}>
    <div className="view-box">
      <h2>{props.message}</h2>
    </div>
  </div>
);

export default Modal;
