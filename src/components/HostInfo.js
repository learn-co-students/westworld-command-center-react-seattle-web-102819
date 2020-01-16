import React from 'react';
import '../stylesheets/HostInfo.css';
import { Radio, Icon, Card, Grid, Image, Dropdown, Divider } from 'semantic-ui-react';
import { Log } from '../services/Log';


const HostInfo = ({ selectedHost, areas, hosts, addLog, setArea, activateHost }) => {

  const handleChange = (e, data) => {
    let newArea = areas.find( area => area.name === data.value)
    let hostsInArea = hosts.filter( host => host.area === data.value)

    if(newArea.limit < (hostsInArea.length + 1)){
      addLog(Log.error(`Too many hosts. Cannot add ${selectedHost.firstName} to ${newArea.label}.`))
    } else {
      addLog(Log.notify(`${selectedHost.firstName} set in area ${newArea.label}`))
      setArea(selectedHost.id, data.value)
    }
  }

  const toggle = () => {
    if(selectedHost.active){
      addLog(Log.notify(`Decommissioned ${selectedHost.firstName}`))
    }else{
      addLog(Log.warn(`Activated ${selectedHost.firstName}`))
    }

    activateHost(selectedHost.id)
  }

  const formattedNames = areas.map( area => {
    return {key: area.id, value: area.name, text: area.label}
  })

  return (
    <Grid>
      <Grid.Column width={6}>
        <Image
          className="hostImg"
          floated='left'
          size='small'
          src={selectedHost.imageUrl}
        />
      </Grid.Column>
      <Grid.Column width={10}>
        <Card>
          <Card.Content>
            <Card.Header>
              {selectedHost.firstName} | {selectedHost.gender === "Male" ? <Icon name='man' /> : <Icon name='woman' />}
            </Card.Header>
            <Card.Meta>
              <Radio
                onChange={toggle}
                label={selectedHost.active ? "Active" : "Decommissioned"}
                checked={selectedHost.active}
                slider
              />
            </Card.Meta>

            <Divider />
            Current Area:
            <Dropdown
              onChange={handleChange}
              value={selectedHost.area}
              options={formattedNames}
              selection
            />
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  )
}

export default HostInfo