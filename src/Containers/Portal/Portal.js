import React, { Component } from 'react'
import Modal from '../../Components/Modal/Modal'
import close from '../../Assets/Images/close-white.svg'


export default class Portal extends Component {
   constructor(props) {
      super(props);

      this.state = {
         showModal: false
      }
   }

   toggleModal = () => {
      this.setState({
         showModal: !this.state.showModal
      })
   };
   closeHandler = () => {
      this.setState({
         showModal: false
      })
   };
   render() {
      const { showModal } = this.state;
      return (
         <div className={this.props.parentclass ? this.props.parentclass : 'Portal'} onClick = {this.props.click}>
            {!this.props.logout && <p
               className={this.props.btn ? this.props.btn : 'modal-toggle'}
               onClick={(e) => this.props.toggle ? this.props.toggle("passwordPopup", e) : this.toggleModal()}
            >
               <span style={this.props.style || {}}>
                  {this.props.name}
               </span>
            </p> || null}
            {
               showModal || this.props.logout || this.props.model ? (
                  <Modal>
                     <div className="portal-content" style={this.props.widthset} id={this.props.id}>
                        {!this.props.show && <div
                           className="modal-close"
                           onClick={() => this.props.close ? this.props.close() : this.closeHandler()}
                        ><span><img src={close} /></span>
                        </div> || null}
                        <div className="data">
                           {this.props.children}
                        </div>
                     </div>
                  </Modal>
               ) : <></>
            }


         </div>
      )
   }

}
