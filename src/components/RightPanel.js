import React from 'react';

export default (props) => {
  return <div
            className='textarea'
            id='test'
            contentEditable="true"
            onClick={e=> props.handlerClick()}>Какой-то текст...</div>
}
