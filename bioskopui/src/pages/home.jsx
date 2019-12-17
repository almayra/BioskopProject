import React, { Component } from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

const url='http://localhost:2000/'

class Home extends Component {
    state={
        dataMovies:[]
    }

    componentDidMount(){
        Axios.get(`${url}movies`)
        .then((res)=>{
            console.log(res)
            this.setState({dataMovies:res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    renderMovies=()=>{
        return this.state.dataMovies.map((val,index)=>{
            return(
                <div key={index} className="col-md-3 py-2 pr-3 pl-1 ">
                    <div className="card kartu bg-dark" style={{width: '100%'}}>
                        <div className="gambaar1">
                            <Link to={'/moviedetail/'+val.id}>
                                <img src={val.image} className="card-img-top kartu gambar" alt="..." />
                            </Link>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title" style={{color:'white'}}>{val.title}</h5>
                            {/* <p className="card-text" style={{color:'grey'}}>{val.sinopsis}</p> */}
                            {/* <a href="#" className="btn btn-primary">Booking Now</a> */}
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className='mx-5'>
                <div className="row py-5" style={{paddingLeft: '10px', paddingRight:'10px'}}>
                    {this.renderMovies()}
                </div>      
            </div>
        );
    }
}

export default Home
