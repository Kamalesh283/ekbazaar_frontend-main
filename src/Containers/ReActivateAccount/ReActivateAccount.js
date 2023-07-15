import React from 'react'
import Title from '../../Components/Title/Title'
import Button from '../../Components/Button/Button';
import "../ReActivateAccount/ReActivateAccount.scss"

function ReActivateAccount(props) {
    return (
        <div className="ReActivateAccount">
            <Title title="Activate Account" />
            <div className="Module">
                <p>Your {props.name} Account has been deactivated. Please activate.</p>
                <Button parentclass="fetching-data" value="Ok" click={props.handleReActivation} />
            </div>
        </div>
    )
}

export default ReActivateAccount
