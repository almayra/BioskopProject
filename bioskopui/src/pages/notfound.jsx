import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export class Notfound extends Component {
    render() {
        return (
            <div className='center'>
                <section class="error-container">
                    <span>4</span>
                    <span><span class="screen-reader-text">0</span></span>
                    <span>4</span>
                </section>
                <h1 style={{color:'white'}} className='mt-5' >NOT FOUND</h1>
                <div class="link-container">
                    <Link to='/' class="more-link">Go To Homepage</Link>
                </div>
            </div>
        )
    }
}

export default Notfound
