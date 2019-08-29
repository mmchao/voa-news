import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter,Route,Switch } from 'react-router-dom'
import { Layout } from 'antd';
import AppHeader from './components/Header/';
import 'antd/dist/antd.css';
import './style.css';
import PageList from './containers/PageList'
import Detail from './containers/Detail'
import Login from './components/Login/';
import Vip from './containers/Vip/'

const { Header, Footer, Content } = Layout;

class App extends Component {
	render() {
		return (
      <BrowserRouter>
        <Layout className="layout">
          <Header className="header">
            <AppHeader />
          </Header>
          <Login />
          <Content className="content">
              <Switch>
                <Route path='/detail/:id' component={ Detail }/>
                <Route path='/vip' component={ Vip } />
                <Route path='/:id?' component={ PageList }/>
              </Switch>
          </Content>
          <Footer className="footer">@Copyright</Footer>
        </Layout>
      </BrowserRouter>
		)
	}
}


ReactDom.render(<App />, document.getElementById('root'));