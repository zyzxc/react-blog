import React, { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import axios from 'axios'
import { Row, Col, List } from 'antd'
import { CalendarOutlined, FolderFilled, FireOutlined } from '@ant-design/icons'
import { defaultUrl } from '../config/apiUrl'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/index.css'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

const Home = (list) => {
  const renderer = new marked.Renderer()
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize: false,
    xhtml: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value
    }
  })
  const [mylist, setMylist] = useState(list.data)
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List 
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item => (
              <List.Item>
                <div className="list-title" key={item.id}>
                  <Link href={{pathname: '/detailed', query: {id: item.id}}}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span><CalendarOutlined />{item.addTime}</span>
                  <span><FolderFilled />{item.typeName}</span>
                  <span><FireOutlined /> {item.view_count}人</span>
                </div>
                <div className="list-context" dangerouslySetInnerHTML={{__html: item.introduce}}></div>
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

Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios(`${defaultUrl}/getArticleList`).then((res) => {
      resolve(res.data)
    })
  })
  return await promise
}

export default Home
