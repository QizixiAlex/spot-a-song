import React, { Component } from 'react';
import { Layout } from 'antd';
import MyHeader from './MyHeader';
import SideBar from './SideBar';
import SongDisplay from './SongDisplay';

const {
  Content, Footer,
} = Layout;

class LayOut extends Component {
  render() {
    return <Layout>
      <MyHeader />
      <Content>
        <Layout style={{ background: '#fff' }}>
          <SideBar style={{ padding: '0 24px' }}/>
          <Content style={{ padding: '0 24px',minHeight: 280 }}>
            <SongDisplay />
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Spot A Song©2019
      </Footer>
    </Layout>
  }
}

export default LayOut;
