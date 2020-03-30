import React from 'react';
import ReactDOM from 'react-dom'


class ProgressBarComp extends React.Component {
    constructor(props) {
      super(props)
      
      this.state = {
        percentage: 0
      }
      
      this.nextStep = this.nextStep.bind(this)
    }
    
    nextStep() {
      if(this.state.percentage === 100) return 
      this.setState(prevState => ({ percentage: prevState.percentage + 25 }))
    }
    
    render() {
      return (
        <div>
          

          <ProgressBar percentage={this.state.percentage} />
          
          <div style={{ marginTop: '20px' }}>  
            <button 
              onClick={this.nextStep}
             >
              Next Step
            </button>  
          </div>   
          
          <div style={{marginTop: '10px', color: 'blue', marginBottom: '15px'}} onClick={() => this.setState({ percentage: 0 })}>
            Reset
          </div>
        </div>
      )
    }  
  }
  
  const ProgressBar = (props) => {
    return (
        <div className="progress-bar">
          <Filler percentage={props.percentage} />
        </div>
      )
  }
  
  const Filler = (props) => {
    return <div className="filler" style={{ width: `${props.percentage}%` }} />
  }
  


  export default ProgressBarComp
  // ReactDOM.render(
  //   <ProgressBarComp />,
  //   document.querySelector('#app')
  // )