import React from 'react';
import Area from './Area'
import { Segment } from 'semantic-ui-react';


const WestworldMap = ({areas, hosts, selectedHostId, selectHost}) => {
 
  const renderHosts = (name) => ( hosts.filter( host => host.area === name ))

  const renderAreas = () => {
    return areas.map( ({ id, name, label, limit }) =>
      <Area
        value={label}
        name={name}
        limit={limit}
        key={id}
        hosts={renderHosts(name)}
        selectedHostId={selectedHostId}
        selectHost={selectHost}
      />
    )
  }

  return (
    <Segment id="map" >
      {renderAreas()}
    </Segment>
  )
}


export default WestworldMap
