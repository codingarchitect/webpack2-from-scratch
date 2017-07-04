import React from 'react';

const lookup = () =>
  (<div className="input-group add-on">
    <input className="form-control srch-term" id="srch-term" type="text" />
    <div className="input-group-btn">
      <button className="btn btn-default"><i className="glyphicon glyphicon-search" /></button>
    </div>
  </div>);

export default lookup;
