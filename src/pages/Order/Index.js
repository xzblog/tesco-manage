/*
 * 订单管理
 * @Author: Miracle
 */

import React, { Component, Fragment } from 'react'
import { Tabs, Form, Input, Button, Row, Col, Select, DatePicker, Table, Badge, Menu, Dropdown, Icon } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import style from './Index.less';

const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;
const menu = (
  <Menu>
    <Menu.Item>
      Action 1
    </Menu.Item>
    <Menu.Item>
      Action 2
    </Menu.Item>
  </Menu>
);

function NestedTable() {
  const rowSpan = (value, row, index) => {
    const obj = {
      children: value,
      props: {},
    };
    if (index === 0) {
      obj.props.rowSpan = row.number;
    } else {
      obj.props.rowSpan = 0;
    }
    return obj;
  };
  const expandedRowRender = () => {
    const columns = [
      { title: '商品图片', dataIndex: 'pic', key: 'pic', render:()=><img src='' alt='' /> },
      { title: '商品名称', dataIndex: 'name', key: 'name' },
      { title: '规格', dataIndex: 'dimensions', key: 'dimensions'},
      { title: '数量', dataIndex: 'number', key: 'number' },
      { title: '单价', dataIndex: 'singlePrice', key: 'single-price' },
      { title: '售后', dataIndex: 'afterSale', key: 'after-sale' },
      { title: '收货人', dataIndex: 'onsignee', key: 'onsignee', render: (value, row, index) => rowSpan(value, row, index)},
      { title: '联系方式', dataIndex: 'mobile', key: 'mobile', render: (value, row, index) => rowSpan(value, row, index)},
      { title: '收货地址', dataIndex: 'address', key: 'address', render: (value, row, index) => rowSpan(value, row, index)},
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        pic: '',
        name: '苹果手机',
        dimensions: '白色',
        number: 3,
        singlePrice: '30',
        afterSale: '是',
        onsignee: '张盛帆',
        mobile: '13032325095',
        address: '杭州市江干区华润大厦',
      });
    }
    return (
      <Table
        bordered
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    );
  };

  const columns = [
    { title: '订单ID', dataIndex: 'orderId', key: 'order-id' },
    { title: '创建时间', dataIndex: 'createdAt', key: 'create-time' },
    { title: '订单状态', dataIndex: 'status', key: 'status' },
    { title: '运费', dataIndex: 'postage', key: 'postage' },
    { title: '总价格', dataIndex: 'totalPrice', key: 'total-price' },
    {
      title: '操作', key: 'operation', render: () => (
        <Fragment>
          <a className={style['link-btn']} href="javascript:;">改价</a>
          <a className={style['link-btn']} href="javascript:;">发货</a>
          <a className={style['link-btn']} href="javascript:;">详情</a>
        </Fragment>
      )
    }
  ];

  const data = [];
  for (let i = 0; i < 2; i++) {
    data.push({
      key: i,
      orderId: '1234567890',
      createdAt: '2014-12-24 23:12:00',
      status: '已付款',
      postage: 12,
      totalPrice: 500,
    });
  }

  return (
    <Table
      className={style.table}
      columns={columns}
      expandedRowRender={expandedRowRender}
      dataSource={data}
    />
  );
}



@Form.create()
class Index extends Component{
  render(){
    const selectBefore = (
      <Select defaultValue="name" style={{ width: 100 }} onChange={console.log('1')}>
        <Option value="name">商品名称</Option>
        <Option value="order">订单号</Option>
        <Option value="real-name">收货人姓名</Option>
        <Option value="mobile">收货人电话</Option>
        <Option value="express-order">快运单号</Option>
      </Select>
    );

    return(
      <Tabs defaultActiveKey="1" style={{backgroundColor:'#fff'}}>
        <TabPane tab={<span>全部</span>} className={style.main} key="1">
          <Form layout="inline" onSubmit={this.handleSubmit}>
            <Form.Item>
              <Input addonBefore={selectBefore} placeholder='请输入关键词' />
            </Form.Item>

            <Form.Item label={formatMessage({id:'app.order.index.create-time'})}>
              <RangePicker onChange={()=>{console.log('data')}} />
            </Form.Item>
            <Form.Item label={formatMessage({id: 'app.order.index.order-type'})}>
              <Select placeholder='全部类型' style={{ width: 120 }} onChange={console.log('2')}>
                <Option value="normal">普通订单</Option>
                <Option value="group">拼团</Option>
              </Select>
            </Form.Item>
            <Button type="primary" className={style.btn}>筛选</Button>
            <Button className={style.btn}>重置</Button>
          </Form>
          <NestedTable />
        </TabPane>
        <TabPane tab={<span>待发货</span>} key="2">
          待发货
        </TabPane>
        <TabPane tab={<span>待付款</span>} key="3">
          待付款
        </TabPane>
        <TabPane tab={<span>已发货</span>} key="4">
          已发货
        </TabPane>
        <TabPane tab={<span>已完成</span>} key="5">
          已完成
        </TabPane>
        <TabPane tab={<span>已关闭</span>} key="6">
          已关闭
        </TabPane>
      </Tabs>
    )
  }
}

export default Index

