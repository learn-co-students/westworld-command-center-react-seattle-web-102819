import React from 'react';
import '../stylesheets/Area.css'
import HostList from './HostList'

const Area = ({ label, name, limit, hosts, selectHost, selectedHostId }) => {
  return (
  <div className='area' id={name}>
    <h3 className='labels'>{label}</h3>
    <HostList
      hosts={hosts}
      selectHost={selectHost}
      selectedHostId={selectedHostId}
      limit={limit}
    />
  </div>)
}


export default Area;
