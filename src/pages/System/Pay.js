/*
 * 支付方式
 * @Author: Miracle
 */

import React, { Component } from 'react'
import { Tabs, Icon, Form, Input, Switch, Button, Row, Col } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';

const { TabPane } = Tabs;

@Form.create()
class Pay extends Component{
  render(){
    const { form } = this.props;
    const { getFieldDecorator } = form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return(
      <Tabs defaultActiveKey="1" style={{backgroundColor:'#fff'}}>
        <TabPane tab={<span><Icon type="alipay" />支付宝</span>} key="1">
          <Row>
            <Col span={12}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Item
                  {...formItemLayout}
                  label={formatMessage({ id: 'app.system.pay.app-id'})}
                >
                  {getFieldDecorator('AppId', {
                    rules: [{
                      type: 'text', message: 'AppId格式不对!',
                    }, {
                      required: true, message: '请输入你的AppId!',
                    }],
                  })(
                    <Input placeholder='请输入支付宝AppId' />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label={formatMessage({ id:'app.system.pay.public-key'})}
                >
                  {getFieldDecorator('pubKey', {
                    rules: [{
                      type: 'text', message: '公钥格式不对!',
                    }, {
                      required: true, message: '请输入你的支付宝公钥!',
                    }],
                  })(
                    <Input placeholder='请输入你的支付宝公钥' />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label={formatMessage({id: 'app.system.pay.private-key'})}
                >
                  {getFieldDecorator('priKey', {
                    rules: [{
                      type: 'text', message: '私钥格式不对!',
                    }, {
                      required: true, message: '请输入你的支付宝私钥!',
                    }],
                  })(
                    <Input placeholder='请输入你的支付宝私钥' />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label={formatMessage({id: 'app.system.pay.callback'})}
                >
                  {getFieldDecorator('callback', {
                    rules: [{
                      type: 'text', message: '域名格式不对!',
                    }, {
                      required: true, message: '请输入回调域名!',
                    }],
                  })(
                    <Input placeholder='请输入回调域名' />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label={formatMessage({id: 'app.system.pay.switch'})}
                >
                  {getFieldDecorator('switch', { valuePropName: 'checked' })(
                    <Switch />
                  )}
                </Form.Item>
                <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
                  <Button type="primary" htmlType="submit"><FormattedMessage id="app.system.pay.btn" defaultMessage="View project" /></Button>
                </Form.Item>

              </Form>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab={<span><Icon type="wechat" />微信</span>} key="2">
          <Row>
            <Col span={12}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Item
                  {...formItemLayout}
                  label={formatMessage({ id: 'app.system.pay.app-id'})}
                >
                  {getFieldDecorator('AppId', {
                    rules: [{
                      type: 'text', message: 'AppId格式不对!',
                    }, {
                      required: true, message: '请输入你的AppId!',
                    }],
                  })(
                    <Input placeholder='请输入支付宝AppId' />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label={formatMessage({ id:'app.system.pay.public-key'})}
                >
                  {getFieldDecorator('pubKey', {
                    rules: [{
                      type: 'text', message: '公钥格式不对!',
                    }, {
                      required: true, message: '请输入你的支付宝公钥!',
                    }],
                  })(
                    <Input placeholder='请输入你的支付宝公钥' />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label={formatMessage({id: 'app.system.pay.private-key'})}
                >
                  {getFieldDecorator('priKey', {
                    rules: [{
                      type: 'text', message: '私钥格式不对!',
                    }, {
                      required: true, message: '请输入你的支付宝私钥!',
                    }],
                  })(
                    <Input placeholder='请输入你的支付宝私钥' />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label={formatMessage({id: 'app.system.pay.callback'})}
                >
                  {getFieldDecorator('callback', {
                    rules: [{
                      type: 'text', message: '域名格式不对!',
                    }, {
                      required: true, message: '请输入回调域名!',
                    }],
                  })(
                    <Input placeholder='请输入回调域名' />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label={formatMessage({id: 'app.system.pay.switch'})}
                >
                  {getFieldDecorator('switch', { valuePropName: 'checked' })(
                    <Switch />
                  )}
                </Form.Item>
                <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
                  <Button type="primary" htmlType="submit"><FormattedMessage id="app.system.pay.btn" defaultMessage="View project" /></Button>
                </Form.Item>

              </Form>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    )
  }
}

export default Pay
