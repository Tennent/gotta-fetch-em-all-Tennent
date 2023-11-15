import React from 'react'

export default function Message({ message }) {
  return (
    <div id='message-box'>
      <p key={message} id='message' data-text={message}></p>
    </div>
  )
}
