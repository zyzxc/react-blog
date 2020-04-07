import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Row, Col, List, Breadcrumb } from 'antd'
import { CalendarOutlined, FolderFilled, FireOutlined } from '@ant-design/icons'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/list.css'
import axios from 'axios'
import { defaultUrl } from '../config/apiUrl'
import Link from 'next/link'

const ArticleList = (list) => {
  const [mylist, setMylist] = useState(list.data)
  return (
    <div>
    <Head>
      <title>Home</title>
    </Head>
    <Header />
    <Row className="comm-main" type="flex" justify="center">
      <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
        <div>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>视频列表</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <List 
          header={<div>最新日志</div>}
          itemLayout="vertical"
          dataSource={mylist}
          renderItem={item => (
            <List.Item>
              <div className="list-title">
                <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                  <a>{item.title}</a>
                </Link>
              </div>
              <div className="list-icon">
                  <span><CalendarOutlined />{item.addTime}</span>
                  <span><FolderFilled />{item.typeName}</span>
                  <span><FireOutlined /> {item.view_count}人</span>
              </div>
              <div className="list-context">{item.introduce}</div>  
            </List.Item>
          )}
        />
      </Col>
      <Col className="comm-box" xs={0} sm={0} md={7} lg={5} xl={4}>
        <Author />
        <Advert />
      </Col>
    </Row>
    <Footer />
  </div>
  )
}

ArticleList.getInitialProps = async (context) => {
  const id = context.query.id
  const promise = new Promise((resolve) => {
    axios(`${defaultUrl}/getListById/${id}`).then((res) => {
      resolve(res.data)
    })
  })
  return await promise
}

export default ArticleList