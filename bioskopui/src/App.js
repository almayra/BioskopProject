import React, { Component } from 'react'
import './App.css';
import Header from './components/header';
import Home from './pages/home';
import {Switch,Route} from 'react-router-dom'
import ManageAdmin from './pages/admin'
import SlideMovies from './components/slider';
import Login from './pages/login'
import MovieDetail from './pages/moviedetail';
import {connect} from 'react-redux'
import {LoginSuccessAction,CartAction} from './redux/action' //tandanya kek balok
import Belitiket from './pages/belitiket';
import Axios from 'axios';
import { APIURL } from './support/ApiURL';
import Regis from './pages/regis'
import Cart from './pages/cart';
import Payment from './pages/payment'
import Notfound from './pages/notfound'

class App extends Component{
  state={
    loading: true,
    datacart:[]
  }

  componentDidMount(){
    var id= localStorage.getItem('aya')
    Axios.get(`${APIURL}users/${id}`)
    .then(res=>{
      console.log(res.data)
      this.props.LoginSuccessAction(res.data)
      Axios.get(`${APIURL}orders?_expand=movie&userId=${id}&bayar=false`) //id diambil dr local storage
      .then((res1)=>{
        var datacart=res1.data
        this.setState({datacart:datacart,loading:false})
      })
    }).catch(err=>{
      console.log(err)
    }).finally(()=>{
      this.setState({loading:false})
    })
  }
  
  render() {
    if(this.state.loading){
      return <div>loading</div>
    }
    this.props.CartAction(this.state.datacart.length)
      return (
        <div className="App">
          <Header/>
          <Switch>
            <Route path={'/'} exact>
              <SlideMovies/> 
              <Home/>
            </Route>
            <Route exact path={'/admin'}>
              <ManageAdmin/>
            </Route>
            <Route path='/moviedetail/:id' component={MovieDetail} exact/>
            <Route path='/belitiket' component={Belitiket} exact />
            <Route path='/cart' exact component={Cart} />
            <Route path={'/login'} exact component={Login} />
            <Route path={'/regis'} exact component={Regis} />
            <Route path={'/payment'} exact component={Payment} />
            <Route path={'/*'} exact component={Notfound} />
            <Route exact path="/404" component={Notfound}/>
          </Switch>
        </div>
      );
    }
  
}

const MapStateToProps=(state)=>{
  return{
    Authlog:state.Auth.login,
    NotifCart:state.Auth.cart
  }
}

export default connect(MapStateToProps,{LoginSuccessAction,CartAction})(App);
