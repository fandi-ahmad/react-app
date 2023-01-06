import React from "react"

class Profile extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <div>
                <h1>ini profile</h1>
                <div>
                    {this.props.paragraf()}
                </div>
            </div>
        )
    }
}

export default Profile