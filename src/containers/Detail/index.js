import React, { Component } from 'react'
import { Card } from 'antd'
import axios from 'axios'
import './style.css'


class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title:'',
      content:''
    }
  }
  componentDidMount() {
    const id = this.props.match.params.id
    axios.get('http://www.dell-lee.com/react/api/detail.json?id=' + id)
      .then(res => {
        const data = res.data.data
        this.setState(data) // 匹配state里同名的属性 或者添加不存在的属性 不会修改其他的 这里不是什么解构赋值 就是setState自己的语法
      })
  }
  render() {
    return (
      <Card title={this.state.title}>
        <div className="detail-content" dangerouslySetInnerHTML={{__html:this.state.content}}></div>
      </Card>
    )
  }
}

export default Detail