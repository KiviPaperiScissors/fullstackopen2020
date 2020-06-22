import React, { useState } from 'react'

const Filter = (props) => (
  <div> Find name: <input
    value={props.phonebookFilterString}
    onChange={props.handleFilterChange}
  />
  </div>
)

export default Filter
