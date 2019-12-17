import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import {APIURL} from '../support/ApiURL'
import Swal from 'sweetalert2'
// import {FaEyeSlash} from 'react-icons/fa'

class Regis extends Component {
    state={
        error:'',
        loading:false
    }

    onRegisClick=()=>{
        var username = this.refs.registerusername.value 
        var password = this.refs.registerpassword.value
        var enterpassword = this.refs.enterpassword.value
        var role='user'
        var newuser={username,password,role}

        if(username===''||password===''||enterpassword===''){
            Swal.fire({
                icon: 'error',
                title:'Failed',
            })
        }else{
            Axios.get(`${APIURL}users?username=${username}`)
            .then((res)=>{
                if(res.data.length===0){
                    if(password !== enterpassword){
                        Swal.fire({
                            icon: 'error',
                            title:'Failed',
                            text:'Password does not match'
                        })
                    }else{
                        Axios.post(`${APIURL}users`,newuser)
                        .then((res1)=>{
                            Swal.fire({
                                icon:'success',
                                title:'Succeed!',
                                text:'You can login now :)'
                            })
                            this.props.history.push('login')
                        })
                        .catch((err1)=>{
                            console.log(err1)
                        })
                    }
                }else{
                    Swal.fire({
                        icon: 'error',
                        title:'Failed',
                        text:'Username already exist'
                    })
                }
            })
        }
    }


    render() {
        return (
            <div>
                <center className='center'>
                    <h3 style={{color:'white'}} className='mt-5'>Register</h3>
                    <div className="form-group mt-3" style={{width:'20%'}}>
                        <input type="text" ref='registerusername' className="form-control mt-4" placeholder="Enter username" />
                    </div>

                    <div className="form-group" style={{width:'20%'}}>
                        <input type="password" ref='registerpassword' className="form-control" placeholder='Enter password' />
                        {/* <i><FaEyeSlash/></i> */}
                    </div>

                    <div className="form-group" style={{width:'20%'}}>
                        <input type="password" ref='enterpassword' className="form-control" placeholder="Confirm password" />
                    </div>

                    <div className="form-group" style={{width:'50%'}}>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        </div>
                    </div>
                    <div className='mt-4'>
                        <button className='btn btn-primary' onClick={this.onRegisClick}>Sign Up</button>
                    </div>
                    <p className="register mt-5" style={{color:'white'}}>
                        Already have an account? <Link style={{color:'pink'}} to='/login'>Sign in.</Link>
                    </p>
                </center>
            </div>
        )
    }
}


export default Regis
