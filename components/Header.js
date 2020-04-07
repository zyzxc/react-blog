import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { defaultUrl } from '../config/apiUrl'
import '../static/style/components/header.css'
import { HomeOutlined, YoutubeOutlined, MessageOutlined, SmileOutlined } from '@ant-design/icons'

import { Row, Col, Menu } from 'antd'
import Router from 'next/router'

const Header = () => {
  const [navArray, setNavArray] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${defaultUrl}/getTypeInfo`).then((res) => {
        setNavArray(res.data.data)
        return res.data.data
      })
      setNavArray(result)
    }
    fetchData()
  }, [])

  const handleClick = (e) => {
      if(e.key === 0) {
          Router.push('/index')
      } else {
          Router.push(`/list?id=${e.key}`)
      }
  }

  return (
    <div className="header">
        <Row type="flex" justify="center">
            <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                <span className="header-logo">
                    <Link href={{pathname:'/index'}}>
                        <a> stacey</a>
                    </Link>
                </span>
                <span className="header-txt">专注前端开发...</span>
            </Col>
            <Col className="menu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                <Menu mode="horizontal" onClick={handleClick}>
                    <Menu.Item key="home">
                        <HomeOutlined />
                        首页
                    </Menu.Item>
                    {
                        navArray.map((item) => {
                            return (
                                <Menu.Item key={item.id}>
                                    {
                                        item.icon === 'youtube' ? 
                                            <YoutubeOutlined /> : item.icon === 'smile' ? <SmileOutlined /> : <MessageOutlined />
                                    }
                                    {item.typeName}
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>
            </Col>
        </Row>
    </div>
  )
}

export default Header

