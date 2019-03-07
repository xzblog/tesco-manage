/*
 * 售后管理
 * @Author: Miracle
 */

import React, { Component } from 'react'
import { Form, Input, Select, Button, DatePicker, Skeleton, Card, List, Avatar, } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';
import style from './Index.less';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Meta } = Card;

const data = [
  {
    name: '张三',
  },
  {
    name: '李四',
  },
  {
    name: '王麻子',
  },
  {
    name: '落叶🍂',
  },
];

class Evaluate extends Component{
  state = {
    loading: false,
  };

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
    const { loading } = this.state;
    return(
      <div className={style['sale-content']}>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item>
            <Input addonBefore={selectBefore} placeholder='请输入关键词' />
          </Form.Item>

          <Form.Item label={formatMessage({id: 'app.order.evaluate.type'})}>
            <Select placeholder='全部类型' style={{ width: 120 }} onChange={console.log('2')}>
              <Option value="1">好评</Option>
              <Option value="2">中评</Option>
              <Option value="3">差评</Option>
            </Select>
          </Form.Item>

          <Form.Item label={formatMessage({id:'app.order.evaluate.time'})}>
            <RangePicker onChange={()=>{console.log('data')}} />
          </Form.Item>

          <Button type="primary" className={style.btn}>筛选</Button>
          <Button className={style.btn}>重置</Button>
        </Form>
        <List
          style={{marginTop: '30px'}}
          grid={{ gutter: 16, column: 4 }}
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <Card actions={['回复', '显示', '操作']}>
                <Skeleton loading={loading} avatar active>
                  <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={item.name}
                    description="用户的评价用户的评价用户的评价"
                  />
                </Skeleton>
              </Card>
            </List.Item>
          )}
        />,
      </div>
    )
  }
}

export default Evaluate
