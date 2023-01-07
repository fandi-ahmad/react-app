import React from 'react'

const BaseToggle = (props) => {
    return (
        <label className="switch pointer">
            {props.slot}
            <span className="slider"></span>
        </label>
    )
}

export default BaseToggle