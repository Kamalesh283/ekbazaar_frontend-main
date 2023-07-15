import React from 'react'
import MessageDates from '../../Components/MessageDates/MessageDates'
import ReceivedMessages from '../../Components/ReceivedMessages/ReceivedMessages'
import SentMessages from '../../Components/SentMessages/SentMessages'
import './ChatMessages.scss'
export default function ChatMessages() {
    return (
        <div className="sentAlignment">
            <MessageDates msgdate="02 Sep 2021" />
            <SentMessages textsent ="Hello, How are you?" sentdate="16:03"/>
            <SentMessages textsent ="Are you there?" sentdate="16:07"/>
            <ReceivedMessages textreceived = " Yes, I am here" receiveddate = "16:12 "/>

        </div>
    )
}
