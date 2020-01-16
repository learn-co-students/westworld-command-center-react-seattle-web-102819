import React, { Component } from 'react';
import '../stylesheets/Headquarters.css';
import { Grid } from 'semantic-ui-react';
import Details from './Details';
import ColdStorage from './ColdStorage';
import LogPanel from './LogPanel';


class Headquarters extends Component {
  state = {
    logEvents: [],
    activated: false
  }

  addLog = (event) => {
    this.setState({
      logEvents: [event, ...this.state.logEvents]
    })
  }

  handleToggleActivate = () => {
    this.setState({
      activated: !this.state.activated
    }, ()=>{this.props.toggleActivateAll(this.state.activated)})
  }

  selectedHost = () => {
    return this.props.hosts.find( host => host.id === this.props.selectedHostId )
    }

  renderInactiveHosts = () => this.props.hosts.filter( host => !host.active )
  


  render(){
    const { areas, hosts, selectedHostId, selectHost, activateHost, setArea } = this.props
    return(
      <Grid celled='internally'>
        <Grid.Column width={8}>
          <ColdStorage
            hosts={this.renderInactiveHosts()}
            selectHost={selectHost}
            selectedHostId={selectedHostId}
          />
        </Grid.Column>
        <Grid.Column width={5}>
          <Details
            hosts={hosts}
            activateHost={activateHost}
            selectedHost={this.selectedHost()}
            areas={areas}
            setArea={setArea}
            addLog={this.addLog}
          />
        </Grid.Column>
        <Grid.Column width={3}>
          <LogPanel
            handleToggleActivate={this.handleToggleActivate}
            events={this.state.logEvents}
            activated={this.state.activated}
            addLog={this.addLog}
          />
        </Grid.Column>
      </Grid>
    )
  }
}

export default Headquarters;
