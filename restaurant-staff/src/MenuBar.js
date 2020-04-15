import React from 'react';
import {Button} from 'primereact/button'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {Redirect, Link} from 'react-router-dom'

class MenuBar extends React.Component {
  constructor() {
      super()
      this.state = {
          items: [
              {label: 'Home', icon: 'pi pi-fw pi-home', command: (event)=> {window.location = "/"}},
              {label: 'Profile', icon: 'pi pi-fw pi-calendar', command: (event) => {window.location = "/profile"}},
              {label: 'Orders', icon: 'pi pi-fw pi-pencil', command: (event) => {window.location = "/orders"}},
              {label: 'Review', icon: 'pi pi-fw pi-cog', command: (event) => {window.location = "/reviews"}},
              {label: 'Promotion', icon: 'pi pi-fw pi-cog', command: (event) => {window.location = "/promotions"}}
          ]
      }
  }

  render() {
      const menuStyle = {
          display: 'inline-block',
          margin: '0px',
          background: 'transparent',
          color: '#7d3cff',
          // borderColor: 'grey',
          width: '200px',
          borderColor: null,
          borderTopColor: null,
          borderBottomColor: null,
          borderRightColor: 'transparent',
          borderLeftColor: 'transparent',
          borderTopWidth: '0px',
          borderBottomWidth: '0px',
          borderRightWidth: '5px',
          borderLeftWidth: '5px',
          alignSelf: 'center',
          fontWeight: 'bold'
          
      }
      return (
          <div>
              <h3 style={{display: 'inline-block', margin: '10px'}}>Food Delivery Service</h3>
              <Link to={{pathname:`/`}}>
                  <Button style = {menuStyle} label="Home" />
              </Link>
              <Link to={{pathname:`/profile`}}>
                  <Button style = {menuStyle} label="Profile" />
              </Link>
              <Link to={{pathname:`/orders`}}>
                  <Button style = {menuStyle} label="Orders" />
              </Link>
              <Link to={{pathname:`/reviews`}}>
                  <Button style = {menuStyle} label="Reviews" />
              </Link>
              <Link to={{pathname:`/promotions`}}>
                  <Button style = {menuStyle} label="Promotions" />
              </Link>
          </div>
      )
  }

}

export default MenuBar