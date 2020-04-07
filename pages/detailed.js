import React from 'react'
import Head from 'next/head'
import { Row, Col, Breadcrumb, Affix } from 'antd'
import { CalendarOutlined, FolderFilled, FireOutlined } from '@ant-design/icons'
import axios from 'axios'
import marked from 'marked'
import hljs from "highlight.js"
import 'highlight.js/styles/monokai-sublime.css'
import Tocify from '../components/tocify.tsx'
import MarkDown from 'react-markdown'
import MarkNav from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/detailed.css'
import { defaultUrl } from '../config/apiUrl'

const Detailed = (props) => {
  const renderer = new marked.Renderer()
marked.setOptions({
  renderer: renderer,
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: false,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
    return hljs.highlightAuto(code).value
  }
})

const tocify = new Tocify()
renderer.heading = function(text, level, raw) {
  const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
};
  let html = marked(props.content)
  return (
    <div>
      <Head>
        <title>博客详细页</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>{props.typeName}</Breadcrumb.Item>
                <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div className="detailed-title">React实战视频教程--Blog开发（更新08集）</div>
              <div className="list-icon center">
                <span><CalendarOutlined /> {props.addTime}</span>
                <span><FolderFilled />{props.typeName}</span>
                <span><FireOutlined />{props.view_count}人</span>
              </div>
              <div className="detailed-content" dangerouslySetInnerHTML = {{__html: html}}>
              </div>
            </div>
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="article-menu">文章目录</div>
              <div className="toc-list">
                {tocify && tocify.render()}
              </div>
              {/* <MarkNav className="ant-anchor" source={markdown} ordered={false}></MarkNav> */}
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

Detailed.getInitialProps = async(context) => {
  console.log(context.query.id)
  const id = context.query.id
  const promise = new Promise((resolve) => {
    axios(`${defaultUrl}/getArticleById/${id}`).then((res) => {
      console.log(res)
      resolve(res.data.data[0])
    })
  })
  return await promise
}

export default Detailed
