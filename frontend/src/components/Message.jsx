import React from 'react'

export default function Message({ message }) {
  return (
    <div className='message-box mt-4'>
      <p key={message} id='message' data-text={message}></p>
    </div>
  )
}
