import React from 'react'

function alert(props) {
  const capitalize = (word)=> {
    const lower = word.toUpperCase();
    return lower.charAt(0) + word.slice(1).toLowerCase();
}
    return (        
        props.alert && <div className={`alert alert-${props.alert.type} fade show`}  role="alert">
        <strong>{capitalize(props.alert.type)}:</strong> {props.alert.msg}
      </div>
    )
}

export default alert