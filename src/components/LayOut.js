import React, { Component } from 'react';
import {
  Layout, Menu, Breadcrumb, Icon,
} from 'antd';
import MyHeader from './MyHeader';
import SideBar from './SideBar';
import SongDisplay from './SongDisplay';

const { SubMenu } = Menu;
const {
  Header, Content, Footer, Sider,
} = Layout;

class LayOut extends Component {
  render() {
    return <Layout>
      <MyHeader />
      <Content>
        <Layout style={{ background: '#fff' }}>
          <SideBar style={{ maxWidth: 300, padding: '0 24px', minHeight: 280 }}/>
          <Content style={{ padding: '0 0 0 24px',minHeight: 280 }}>
            <SongDisplay />
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  }
}

export default LayOut;
