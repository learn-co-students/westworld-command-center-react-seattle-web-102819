import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import WestworldMap from './components/WestworldMap'
import Headquarters from './components/Headquarters'

const URL = "http://localhost:4000/"

class App extends Component {

  state = {
    hosts: [],
    areas: [],
    selectedHostId: null
  }

  //helper to format these area names so they appear nicer
  formatAreas = areas => {
    return areas.map( area => {
      let formattedName = area.name.split("_").map( word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
      area["label"] = formattedName
      return area
    })
  }

  componentDidMount(){
    let hostsProm = fetch(URL + "hosts")
			.then(res => res.json())
    let areasProm = fetch(URL + "areas")
      .then(res => res.json())

    Promise.all([hostsProm, areasProm])
      .then( ([hosts, areas]) => {
        areas = this.formatAreas(areas)
        console.log(hosts, areas)
        this.setState({hosts, areas})
      })
  }

  toggleActivateAll = (activeStatus) => {
    this.setState( prevState => {
      return { hosts: prevState.hosts.map( host => {
        host.active = activeStatus
        return host
      })}
    })
  }


  selectHost = (id) => {this.setState({selectedHostId: id}) }

  showActiveHosts = () => this.state.hosts.filter( host => host.active )


  setArea = (id, areaName) => {
    this.setState( prevState => {
      let update = prevState.hosts.map( host => {
        if(host.id === id){
          host.area = areaName
        }
        return host
      })
      return {hosts: update}
    })
  }

  activateHost = (id) => {
    this.setState( prevState => {

      prevState.hosts.forEach( host => {
        if(host.id === id){
          host.active = !host.active
        }
      })

      return {hosts: prevState.hosts}
    })
  }

  render(){
    return (
      <Segment id='app'>
        <WestworldMap 
          areas={this.state.areas} 
          hosts={this.showActiveHosts()}
          selectedHostId={this.state.selectedHostId}
          selectHost={this.selectHost}
          />

        <Headquarters 
          hosts={this.state.hosts} 
          areas={this.state.areas} 
          activateHost={this.activateHost}
          selectedHostId={this.state.selectedHostId}
          selectHost={this.selectHost}
          setArea={this.setArea}
          toggleActivateAll={this.toggleActivateAll}
        />
      </Segment>
    )
  }
}

export default App;
