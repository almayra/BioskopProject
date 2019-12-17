import React, { Component } from "react";
import {Link,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {LoginSuccessAction,Loginthunk,Login_error} from './../redux/action'
import Loader from 'react-loader-spinner'

class Login extends Component{
    state={
        error:'',
        loading:false
    }

    onLoginClick=()=>{
        var username=this.refs.username.value 
        var password=this.refs.password.value
        this.props.Loginthunk(username,password)
    }
    
    render() {
        console.log(this.props.Authlog)
        console.log(this.props.AuthId)
        
        if(this.props.Authlog){
            return <Redirect to={'/'}/>
        }
        return (
            // <form>
                <center className='center'>
                <h3 style={{color:'white'}} className='mt-5'>Sign In</h3>

                <div className="form-group" style={{width:'20%'}}>
                    <input type="text" ref='username' className="form-control mt-4" placeholder="Enter username" />
                </div>

                <div className="form-group" style={{width:'20%'}}>
                    <input type="password" ref='password' className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group" style={{width:'50%'}}>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    </div>
                </div>
                {this.props.Auth.error===''?
                    null
                    :
                    <div className='alert alert-danger mt-2'>
                        {this.props.Auth.error}<span onClick={this.props.Login_error} className='float-right font-weight-bold' >X</span>
                    </div>
                }
                <div className='mt-4'>
                    {this.props.Auth.loading?
                        <Loader type="Hearts" color="pink" height={100} width={100} />
                    :
                    <button className='btn btn-primary' onClick={this.onLoginClick}>Login</button>
                    }
                </div>
                <p className="register mt-5" style={{color:'white'}}>
                    Doesn't have an account? <Link style={{color:'pink'}} to='/regis'>Register now.</Link>
                </p>
                </center>
            // </form>
        );
    }
}

const MapStateToProps=(state)=>{
    return{
        Authlog:state.Auth.login,
        AuthId:state.Auth.id,
        Auth:state.Auth
    }
}

export default connect(MapStateToProps,{LoginSuccessAction,Loginthunk,Login_error})(Login)