import React, { Component } from 'react'
import Axios from 'axios'
import { APIURL } from '../support/ApiURL'
import { Modal,ModalBody,ModalFooter } from 'reactstrap'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {MdAccessTime} from 'react-icons/md'

class MovieDetail extends Component {
    state={ 
        datadetailfim:{},
        traileropen:false,
        notloginyet:false,
        kelogin:false,
        belitiket:false
    }

    componentDidMount(){
        Axios.get(`${APIURL}movies/${this.props.match.params.id}`)
        .then(res=>{
            this.setState({datadetailfim:res.data})
        }).catch(err=>{
            console.log(err)
        })
    }

    onBeliTicketClick=()=>{
        if(this.props.Authlog){
            this.setState({belitiket:true})
        }else{
            this.setState({notloginyet:true})
        }
    }

    render() {
        if(this.state.kelogin){
            return <Redirect to={'/login'}/>
        }
        if(this.state.belitiket){
            return <Redirect to={{pathname:'/belitiket',state:this.state.datadetailfim}}/>
        }
        return (
            <div>
                <Modal isOpen={this.state.traileropen} size='lg' toggle={()=>this.setState({traileropen:false})} className='trailer' wrapClassname='trailer'>
                    <ModalBody className='p-0 bg-transparent trailer'>
                    <iframe width="100%" height="100%" title={this.state.datadetailfim.title} src={this.state.datadetailfim.trailer}
                    frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                    </iframe>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.notloginyet} centered toggle={()=>this.setState({notloginyet:false})}>
                    <ModalBody style={{fontFamily:'Lucida Sans', fontWeight:'bold', fontSize:'20px', textAlign:'center'}}>
                        You have to login first
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={()=>this.setState({kelogin:true})} className='btn btn-primary'>Okay</button>
                    </ModalFooter>
                </Modal>
                <div className='row' style={{height:'92vh'}}>
                    <div class="card text-white bg-dark mr-auto" style={{width:'50rem'}}>
                        <div class="card-body" style={{height:'92vh'}}>
                            <h1 class="card-title"> {this.state.datadetailfim.title} </h1>
                            <h6 class="card-subtitle mt-2" style={{color:'#D3D3D3'}}>by {this.state.datadetailfim.sutradara} </h6>
                            <h6 class="card-subtitle mt-2 mb-5" style={{color:'#CCCCCC'}}><MdAccessTime/> {this.state.datadetailfim.durasi} minutes </h6>
                            <p class="card-text"> {this.state.datadetailfim.sinopsis} </p>
                            <button className='mt-3 mr-4 btn btn-primary' onClick={this.onBeliTicketClick} >Get Ticket</button>
                            <button className='mt-3 btn btn-outline-info' onClick={()=>this.setState({traileropen:true})} >Trailer</button>
                        </div>
                    </div>
                </div>
            <div/>
        </div>
        )
    }
}

const MapStateToProps=(state)=>{
    return{
        Authlog:state.Auth.login 
    }
}

export default connect(MapStateToProps) (MovieDetail)
