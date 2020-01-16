
  import React from 'react'
  import { Segment, Button } from 'semantic-ui-react';
  import { Log } from '../services/Log'
  
  const LogPanel = ({ events, activated, handleToggleActivate, addLog }) => {
  
    const handleClick = () => {
      if(activated){
        addLog(Log.notify(`Decommissioned all hosts.`))
      }else{
        addLog(Log.warn(`Activated all hosts!`))
      }
      handleToggleActivate()
    }
 
  
    return(
      <Segment className="HQComps" id="logPanel">
        <pre>
          {events.map((e, i) => <p key={i} className={e.type}>{e.msg}</p>)}
        </pre>
        <Button
          fluid
          color={activated ? "green" : "red"}
          onClick={handleClick}
          content={activated ? "DECOMMISSION ALL" : "ACTIVATE ALL"}
        />
      </Segment>
    )
  }
  
  export default LogPanel
