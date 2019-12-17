import React, { Component } from 'react'
import Axios from 'axios'
import {connect} from 'react-redux'
import {Table,Modal,ModalHeader,ModalBody} from 'reactstrap'
import {APIURL} from './../support/ApiURL'

export class Cart extends Component {
    state={
        datacart:null,
        modaldetail:false,
        indexdetail:0
    }

    componentDidMount(){
        Axios.get(`${APIURL}orders?_expand=movie&userId=${this.props.userId}&bayar=false`)
        .then((res)=>{
            // this.setState({datacart:res.data})
            var datacart=res.data
            var qtyarr=[]
            console.log('res.data',datacart)
            res.data.forEach(element=>{
                qtyarr.push(Axios.get(`${APIURL}ordersDetails?orderId=${element.id}`))
            })

            var qtyarrfinal=[]
            // console.log(qtyarr)
            Axios.all(qtyarr)
            .then((res1)=>{
                res1.forEach((val)=>{
                    qtyarrfinal.push(val.data)
                })
                console.log(qtyarrfinal)
                var datafinal=[]
                datacart.forEach((val,index)=>{
                    datafinal.push({...val,qty:qtyarrfinal[index]})
                })
                console.log(datafinal)
                this.setState({
                    datacart:datafinal
                })
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    renderCart=()=>{
        if(this.state.datacart!==null){
            return this.state.datacart.map((val,index)=>{
                return(
                    <tr key={index} >
                        <td style={{width:100}}> {index+1} </td>
                        <td style={{width:300}}> {val.movie.title} </td>
                        <td style={{width:100}}><button disabled className='btn btn-outline-primary'>{val.jadwal}.00</button></td>
                        <td style={{width:100, textAlign:'center'}}> {val.qty.length} </td>
                        <td style={{width:100}}> <button onClick={()=>this.setState({modaldetail:true,indexdetail:index})} className='btn btn-info'>Details</button> </td>
                    </tr>
                )
            })
        }
    }

    render() {
        if(this.props.userId){
            return (
                <div>
                    <Modal isOpen={this.state.modaldetail} toggle={()=>this.setState({modaldetail:false})} >
                        <ModalHeader>
                            Details
                        </ModalHeader>
                        <ModalBody>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Seat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.datacart!==null&&this.state.datacart.length!==0?
                                    this.state.datacart[this.state.indexdetail].qty.map((val,index)=>{
                                        return(
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[val.row]+(val.seat+1)}</td>
                                            </tr>
                                        )
                                    })
                                    :
                                    null  
                                }
                                </tbody>
                            </Table>
                        </ModalBody>
                    </Modal>
                    <center className='center'>
                    <Table className='mt-3' style={{width:600,color:'white'}}>
                        <thead>
                            <tr>
                                <th style={{width:100,color:'white'}}>No.</th>
                                <th style={{width:300,color:'white'}}>Title</th>
                                <th style={{width:100,color:'white'}}>Schedule</th>
                                <th style={{width:100,color:'white'}}>Quantity</th>
                                <th style={{width:100,color:'white'}}>Detail</th>
                            </tr>
                        </thead>
                        <tbody style={{color:'white'}}>
                            {this.renderCart()}
                        </tbody>
                    </Table>
                    <button className='btn btn-success'>CheckOut</button>
                    </center>
                </div>
            )
        }
    }
}

const MapStateToProps=(state)=>{
    return{
        AuthLog:state.Auth.login,
        userId:state.Auth.id
    }
}

export default connect(MapStateToProps)(Cart)
