import React from 'react';

export default (props) => {
  return <div
            className='textarea'
            id='textarea'
            contentEditable="true"
            onBlur={e => props.handlerBlur()}
            onFocus={e=> props.handlerFocus()}
            >Какой-то текст...</div>
}
