import React from 'react';

class RightPanel extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){
    return <div
              className='textarea'
              id='textarea'
              contentEditable="true"
              onBlur={e => this.props.handlerBlur()}
              onFocus={e=> this.props.handlerFocus()}
              >Какой-то текст...</div>
  }
}


export default RightPanel;
