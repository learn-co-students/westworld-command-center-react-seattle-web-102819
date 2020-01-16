import React from 'react'
import { Card } from 'semantic-ui-react'
import Host from './Host'

const HostList = ({ hosts, selectHost, selectedHostId, limit }) => {

  const renderHosts = () => (
    hosts.map( host => {
      if(selectedHostId === host.id){
        return <Host
                 imageUrl={host.imageUrl}
                 id={host.id} key={host.id}
                 selectHost={selectHost}
                 selected={true}
               />
      }else{
        return <Host
                 imageUrl={host.imageUrl}
                 id={host.id} key={host.id}
                 selectHost={selectHost}
                 selected={false}
               />
      }
    })

  )

  return(
    <Card.Group itemsPerRow={6}>
      {renderHosts()}
    </Card.Group>
  )
}

export default HostList
