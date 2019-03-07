/*
 * 售后管理
 * @Author: Miracle
 */

import React, { Component } from 'react'
import { Table, Form, Input, Select, Button, DatePicker } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import style from './Index.less';

const { Option } = Select;
const { RangePicker } = DatePicker;

const columns = [
  { title: '退款编号', dataIndex: 'refundId', key: 'refundId' },
  { title: '退款方式', dataIndex: 'refundType', key: 'refundType' },
  { title: '退款状态', dataIndex: 'refundStatus', key: 'refundStatus' },
  { title: '申请时间', dataIndex: 'time', key: 'time' },
  { title: '退款金额', dataIndex: 'refundPrice', key: 'refundPrice' },
  { title: '订单金额', dataIndex: 'orderPrice', key: 'orderPrice' },
  { title: '订单号', dataIndex: 'orderId', key: 'orderId', render: text => <a href="javascript:;">{text}</a> },
  { title: '收货人', dataIndex: 'realName', key: 'realName' },
  { title: '退款原因', dataIndex: 'refundCause', key: 'refundCause' },
  { title: '操作', key: 'action', render: () =>  <a href="javascript:;">详情</a>}
  ];

const data = [];
for (let i = 0; i < 4; ++i) {
  data.push({
    key: i,
    refundId: '1234567890',
    refundType: '仅退款',
    refundStatus: '已同意',
    time: '申请时间',
    refundPrice: 30,
    orderPrice: 50,
    orderId: '0987654321',
    realName: '张盛帆',
    refundCause: '发错货了'
  });
}

class AfterSale extends Component{
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
      <div className={style['sale-content']}>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item>
            <Input addonBefore={selectBefore} placeholder='请输入关键词' />
          </Form.Item>

          <Form.Item label={formatMessage({id: 'app.order.sale.type'})}>
            <Select placeholder='全部类型' style={{ width: 120 }} onChange={console.log('2')}>
              <Option value="1">仅退款</Option>
              <Option value="2">退款退货</Option>
            </Select>
          </Form.Item>
          <br />
          <br />

          <Form.Item label={formatMessage({id: 'app.order.sale.status'})}>
            <Select placeholder='全部状态' style={{ width: 200 }} onChange={console.log('2')}>
              <Option value="1">申请退款，待商家确认</Option>
              <Option value="2">同意申请，待买家退货</Option>
              <Option value="3">买家已发货，待收货</Option>
              <Option value="4">已收获，确认退货</Option>
              <Option value="5">退款成功</Option>
              <Option value="6">退款关闭</Option>
              <Option value="7">同意退款，仅退款</Option>
              <Option value="8">拒绝（驳回）</Option>
            </Select>
          </Form.Item>

          <Form.Item label={formatMessage({id:'app.order.sale.time'})}>
            <RangePicker onChange={()=>{console.log('data')}} />
          </Form.Item>

          <Button type="primary" className={style.btn}>筛选</Button>
          <Button className={style.btn}>重置</Button>
        </Form>
        <Table columns={columns} dataSource={data} style={{marginTop: '20px'}} />
      </div>
    )
  }
}

export default AfterSale
