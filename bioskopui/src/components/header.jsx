import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import { LogoutSuccessAction } from '../redux/action';
import {IoIosCart} from 'react-icons/io'
import {MdAccountCircle} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'

const logOutUser=()=>{
  localStorage.clear()
  LogoutSuccessAction()
}

class Header extends Component {
  state = {  }
  render(){
    const {isOpen, setIsOpen} = this.state
    const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/" style={{fontWeight:'bolder'}}>MI M♡VIE</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>

          {console.log(this.props.role)}
            {this.props.role===''?
            (
              <div>
                  <DropdownToggle className='mr-3'>
                    <Link to={'/login'} style={{color:'white', textDecoration:'none', fontFamily:'Lucida Sans'}}>
                    Login
                    </Link>
                  </DropdownToggle>
                  <DropdownToggle>
                    <Link to={'/regis'} style={{color:'white', textDecoration:'none', fontFamily:'Lucida Sans'}}>
                    Register
                    </Link>
                  </DropdownToggle>
                </div>
              )
              :
              null
            }

            {  
              this.props.username===''? null : this.props.role==='admin'?
              (
                <div className='d-flex'>
                  <NavItem>
                    <NavLink style={{color:'white'}} href="/admin" className='mt-2 mr-3'>Manage Admin</NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret className='mt-2' style={{fontFamily:'Lucida Sans',fontSize:'16px',color:'white'}}>
                    <MdAccountCircle className='mr-1' style={{color:'white', fontSize:'28px'}}/>
                      {this.props.username}
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem divider />
                      <DropdownItem>
                        <NavLink href="/" onClick={()=>logOutUser()} style={{color:'white'}} className="btn btn-dark"><FiLogOut className='mr-2'/>Logout</NavLink>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              )
              : 
              this.props.role==='user'?
              (
                <div className='d-flex'>
                  <NavItem>
                    <NavLink href="/components/" style={{color:'white'}} className='mt-2 mr-3'>History</NavLink>
                  </NavItem>
                  <NavItem className='mt-3 mr-1' style={{color:'white',fontWeight:'bolder'}}>
                    {this.props.NotifCart}
                  </NavItem>
                  <NavItem>
                    <Link to={'/cart'}><IoIosCart className='mt-3 mr-3' style={{color:'white', fontSize:'28px'}}/></Link>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/payment" style={{color:'white'}} className='mt-2 mr-3'>Payment</NavLink>
                  </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret className='mt-2' style={{fontFamily:'Lucida Sans',fontSize:'16px',color:'white'}}>
                        <MdAccountCircle className='mr-1' style={{color:'white', fontSize:'28px'}}/>
                        {this.props.username}
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem divider />
                        <DropdownItem>
                          <NavLink href="/" onClick={()=>logOutUser()} style={{color:'white'}} className="btn btn-dark"><FiLogOut className='mr-2'/> Logout</NavLink>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
              ): null
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
}

const MapStateToProps=state=>{
  // {console.log(state.Auth.role)}
  return{
    Authname: state.Auth.username,
    role: state.Auth.role,
    username: state.Auth.username,
    NotifCart:state.Auth.cart
  }
}

export default connect(MapStateToProps) (Header);