import React, { Component } from 'react'
import axios from 'axios'
import { List } from 'antd'
import { Link } from 'react-router-dom'

class PageList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newsList:[]
    }
  }
  componentWillReceiveProps(nextProps) {
    this.getNewsList(nextProps.match.params.id)
  }

  // shouldComponentUpdate() {
  //   return false  // return false 组件就不更新了
  // }
  // componentWillUpdate(){
  //   // this.getNewsList() 这里获取数据 会无线循环
  // }
  getNewsList(id) {
    let url = 'http://www.dell-lee.com/react/api/list.json'
    if(id) {
      url += '?id=' + id
    } else {
      url += '?id=1'
    }
    axios.get(url).then(res => {
      this.setState({
        newsList: res.data.data
      })
    })
  }
  componentDidMount() {
    // console.log(this.props) undefined
    this.getNewsList(this.props.match.params.id)
  }
  render() {
    return (
      <List
        style={{background:'#fff'}}
        bordered
        dataSource={this.state.newsList}
        locale={{emptyText:''}} // 不显示no-data
        renderItem={item => (
          <List.Item>
            <Link to={`/detail/${item.id}`}>{item.title}</Link>
          </List.Item>
        )}
      />
    )
  }
}

export default PageList