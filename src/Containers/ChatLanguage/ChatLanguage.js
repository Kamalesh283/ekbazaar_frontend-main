import React, { Component } from 'react'
import Button from '../../Components/Button/Button'
import ChatTitle from '../../Components/ChatTitle/ChatTitle'
import FormSelect from "../../Components/FormSelect/FormSelect";
import Form from "../../Components/Form/Form";
import arrow from '.././../Assets/Images/chat-arrow-down.svg'
import './ChatLanguage.scss'
import { siteLanguagesList } from '../../utils/utils'
const languages = siteLanguagesList
export default class ChatLanguage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toggle: false
        }
    }
    toggleHandler = () => {
        this.setState({
            toggle: !this.state.toggle
        })
    }
    onSubmit = (e) => {
        e.preventDefault()
        // this.props.nextStep(2)
        // this.props.goToStep(1)
        this.props.onSubmit(e, this.props.goToStep)
    }
    componentDidMount() {
        document.body.classList.add("scrm")
      }
   componentWillUnmount() {
        document.body.classList.remove("scrm")
    }
    render() {
        return (
            <div className="ChatLanguage">
                <ChatTitle><h5><span className="active"></span>Chat with seller {this.props.messageCount && this.props.messageCount > 0 ? <span className="total-unread-count">{this.props.messageCount}</span> : false}</h5> <img onClick={this.props.minimize} src={arrow} /></ChatTitle>
                <div className="content">
                    <p className="bodycopy">Please select the language you want to interact in <span style={{color:'red'}}>*</span></p>
                    <div className="select-language-chat">
                        {/* <div className="select-toggle" onClick={this.toggleHandler}><p>Select a Language</p></div>
                                    {this.state.toggle &&
                                    <div className="options">
                                        <ul>
                                            <li><a>English</a></li>
                                            <li><a>Tamil</a></li>
                                            <li><a>Telugu</a></li>
                                            <li><a>Kannada</a></li>
                                            <li><a>Hindi</a></li>
                                        </ul>
                                    </div>
                                    ||
                                    ''
                                    } */}
                        {/* <select>
                            <option>Select a Language</option>
                            <option>English</option>
                            <option>Tamil</option>
                            <option>Telugu</option>
                            <option>Kannada</option>
                            <option>Hindi</option>
                        </select> */}
                        <Form
                            submit={true}
                            onClick={(e) => this.onSubmit(e)}
                        >
                            <FormSelect
                                isSearchable={false}
                                className="who"
                                options={languages}
                                onChange={this.props.onChange}
                                value={this.props.value}
                                placeholder={"Select Language"}
                                classNamePrefix={"role"}
                                // menuIsOpen={true}
                            />
                        </Form>
                        <Button click={e => this.onSubmit(e)} parentclass="continue" value="Continue" />
                    </div>
                    {/* <Button parentclass="continue" value="continue" click={this.props.nextStep} /> */}
                </div>
            </div>
        )
    }
}
