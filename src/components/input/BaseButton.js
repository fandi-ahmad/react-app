import React from 'react'

const BaseButton = (props) => {
    return (
        <button
            className={'btn ' + props.className}
            id={props.id}
            onClick={props.onClick}
        >
            {props.name}
        </button>
    )
}

export default BaseButton