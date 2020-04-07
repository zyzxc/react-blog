import { Avatar, Divider } from 'antd'
import { GithubOutlined, QqOutlined, WechatOutlined } from '@ant-design/icons'
import '../static/style/components/author.css'

const Author = () => {
    return (
        <div className="author-div comm-box">
            <div>
                <Avatar size={100} src="http://blogimages.jspang.com/blogtouxiang1.jpg"></Avatar>
            </div>
            <div className="author-introduction">
                专注于WEB和移动前端开发。此地维权无门，此时无能为力，此心随波逐流。
                <Divider>社交帐号</Divider>
                <Avatar size={28} icon={<GithubOutlined />} className="account"></Avatar>
                <Avatar size={28} icon={<QqOutlined />} className="account"></Avatar>
                <Avatar size={28} icon={<WechatOutlined />} className="account"></Avatar>
            </div>
        </div>
    )
}

export default Author