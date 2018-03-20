import React from 'react';

const AssignContainersHeader = () => (
  <div>
    <h2> Create A New Shipping Plan Here </h2>
    <div id="instructionsContainer">
      <div><span className="instruction"> 1). Select a possible ship from the dropdown </span></div>
      <div><span className="instruction"> 2). Click all containers that you want to add to the plan </span></div>
      <div><span className="instruction"> 3). Press submit plan below the dropdown </span></div>
    </div>
  </div>
);

export default AssignContainersHeader;
