import React, { Component } from 'react'
// import Card from '../Card/Card';
import './MegaMenu.scss'
import history from "../../Routes/history";
import { category } from '../../Routes/path'
import Loading from '../Loading/Loading';
export default class MegaMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: ''
        }
    }
    clickHandler(e, data) {
        e.preventDefault();
        this.setState({
            id: data.id
        })
        this.props.parentRedirect(e, data.id, data.header)
    }
    render() {
        const data = this.props.data
        const test = data.products

        return (

            <div className="MegaMenu">
                <div className="level-one">
                   {data && data.length && <ul>
                        { data.map((xyz, index) =>
                            <li key={index} onClick={(e) => this.clickHandler(e, xyz)} className="text" style={{ position: 'relative' }}>

                                {xyz.header}
                                {/* <div className="level-two">
                                    <Card content={xyz.products} />
                                    <button className="view-all" value="View all" onClick={(e) => this.clickHandler(e, xyz)}>View all</button>

                                </div> */}

                            </li>
                        )}
                        {/* <li className="allhiddend" onClick={(e) => history.push(category)}>zzz</li> */}
                        <li className="all" onClick={(e) => history.push(category)}>All Categories</li>
                    </ul>
                    || <ul><li className="all"><Loading/></li></ul>
                    }

                </div> 
                


            </div>
        )
    }
}
