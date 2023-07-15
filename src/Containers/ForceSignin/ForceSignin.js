import React from 'react'
import Overlay from '../../Components/Overlay/Overlay'
import Title from '../../Components/Title/Title'
import './ForceSignin.scss'
import close from "../../Assets/Images/xclose.svg";
import Button from '../../Components/Button/Button';
export default function ForceSignin(props) {
    return (
        <div className="ForceSignin">
            <Overlay>
                <Title title={props.title} >
                    <img src={close} onClick={props.closemodule} />
                </Title>
                <div className="module">
                   <p> {props.info}</p>
                    <Button parentclass="force" value="Sign In Now" click={props.click} />
                </div>
            </Overlay>
        </div>
    )
}