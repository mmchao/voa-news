import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd';
import logo from './logo.png';
import './style.css';
import axios from 'axios'

class AppHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuList:[]
    }
  }
  getMenuList() {
    return this.state.menuList.map(item => {
      return (
          <Menu.Item key={item.id}>
            <Link to={`/${item.id}`}>
              <Icon type={item.icon} />{item.title}
            </Link>
          </Menu.Item>
      )
    })
  }

  componentDidMount() {
    axios.get('http://www.dell-lee.com/react/api/header.json')
      .then(res => {
        this.setState({
          menuList: res.data.data
        })
      })
  }

	render() {
		return (
			<Fragment>
        <Link to="/">
          <img src={logo} className='app-header-logo' alt='logo'/>
        </Link>
				<Menu mode="horizontal" className='app-header-menu'>
          { this.getMenuList() }
	      </Menu>
      </Fragment>
		)
	}
}

export default AppHeader;