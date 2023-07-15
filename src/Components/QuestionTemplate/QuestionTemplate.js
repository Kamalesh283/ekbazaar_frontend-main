import React from 'react'
import './QuestionTemplate.scss'
export default function QuestionTemplate(props) {
    const sendMessage = (values) => {
        props.sendMessage(values)
        props.heightRotateHandler()
    }
    return (
        <div className="QuestionCont" onClick={() => sendMessage(props.eng || props.question)}>
            <p>{props.question}</p>
        </div>
    )
}
