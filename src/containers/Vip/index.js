import React, { Component } from 'react'
import axios from 'axios'
import './style.css'
import { Redirect } from 'react-router-dom'


class Vip extends Component {
  constructor(props) {
    super(props)
    this.state = {
     login: true, // 如果一开始设为false 则会直接redirect到首页
     fetchFinsh: false
    }
  }
  
  componentWillMount() {
    // console.log(1)  axios是异步的 所以不能保证在render() 执行之前修改state的值
    axios.get('http://www.dell-lee.com/react/api/isLogin.json', {
			withCredentials: true
		}).then(res => {
      const login = res.data.data.login
      this.setState({
        login,
        fetchFinsh: true
      })
      
    })
  }
  render() {
    // console.log(2)
    if(this.state.login) {
      if(this.state.fetchFinsh) {
        return <div className='vip'>Vip</div>
      } else {
        return <div className='vip'>正在判断登录状态</div>
      }
    } else {
      return (
        <Redirect to='/'/>
      )
    }
  }
  

}

export default Vip