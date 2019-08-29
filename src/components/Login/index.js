import React, { Component } from 'react'
import axios from 'axios'
import { Button, Modal, Input, message } from 'antd'
import './style.css'
import { withRouter, Link } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: false,
      modal: false,
      userName: '',
      passWord: ''
    }
    this.showModal = this.showModal.bind(this);
		this.hideModal = this.hideModal.bind(this);
		this.changeUserName = this.changeUserName.bind(this);
		this.changePassWord = this.changePassWord.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.logout = this.logout.bind(this)
  }
  showModal() {
    this.setState({
      modal: true
    })
  }
  hideModal() {
    this.setState({
      modal: false
    })
  }
  changeUserName(e) {
    this.setState({
      userName: e.target.value
    })
  }
  changePassWord(e) {
    this.setState({
      passWord: e.target.value
    })
  }
  checkLogin() {
    const { userName, passWord } = this.state
    const url = `http://www.dell-lee.com/react/api/login.json?user=${userName}&password=${passWord}`;
    axios.get(url,{
      withCredentials:true
    }).then(res => {
      const login = res.data.data.login
      if (login) {
        message.success('登录成功')
        this.hideModal()
        this.setState({login})
      } else {
        message.error('登录失败')
      }
    })
  }
  logout() {
    axios.get('http://www.dell-lee.com/react/api/logout.json', {
			withCredentials: true
		}).then(res => {
      const logout = res.data.data.logout
      if(logout) {
        this.setState({login:false})
        this.props.history.push('/'); // 也可以在button上加link 但是无法确认登出成功后再跳转
      }
    })
  }
  componentDidMount() {
    axios.get('http://www.dell-lee.com/react/api/isLogin.json', {
			withCredentials: true
		}).then(res => {
      const login = res.data.data.login
      this.setState({login})
    })
  }
  render() {
    return (
      <div className="login">
        {
          this.state.login ? <Button type="primary" onClick={this.logout}>退出</Button> :
                             <Button type="primary" onClick={this.showModal}>登录</Button>
                  
        }
        <Link to='/vip'>
          <Button type="primary" className='vipBtn'>Vip</Button>
        </Link>
        
        <Modal title="登录" visible={this.state.modal} onOk={this.checkLogin} onCancel={this.hideModal}>
          <Input className="input" placeholder="请输入用户名" value={this.state.userName} onChange={this.changeUserName}/>
          <Input className="input" placeholder="请输入密码" value={this.state.passWord} type="password" onChange={this.changePassWord}/>
        </Modal>
      </div>

    )
  }
}

export default withRouter(Login)