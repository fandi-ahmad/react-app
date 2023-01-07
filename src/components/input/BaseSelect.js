import React from 'react'

const BaseSelect = (props) => {
    return (
        <div>
            <div className='fs-6 text-capitalize pb-2'>{props.label}</div>
            <select className='form-select'>
                {props.children}
            </select>
        </div>
    )
}

export default BaseSelect