import React from 'react'

const Filter = (props) => (
  <div> Find name: <input
    value={props.countryFilterString}
    onChange={props.handleFilterChange}
  />
  </div>
)

export default Filter
