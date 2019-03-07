/*
 * 管理员管理
 * @Author: Miracle
 */
import React, { Component } from 'react'
import { Table, Divider, Button, Modal, Form, Input, Select, message, Icon } from 'antd';
import { connect } from 'dva';
import moment from 'moment';

import styles from './Admin.less';

const { Option } = Select;

@connect(({ admin, loading }) => ({
  admin,
  loading: loading.effects['admin/fetchAll'],
}))
class Admin extends Component{
  state = {
    visible: false,
    status: 'create',
    formData: {}
  };

  columns = [
    { title: '序号', key: 'index', render: (text, record, index)=> (index + 1) },
    { title: '昵称', dataIndex: 'username'},
    { title: '角色', dataIndex: 'role.description' },
    { title: '电话', dataIndex: 'mobile' },
    { title: '邮箱', dataIndex: 'email' },
    { title: '创建时间', dataIndex: 'createdAt', render: val => <span>{moment(val).format('YYYY-MM-DD')}</span> },
    { title: '操作', key: 'action', render: (record) => (
      <span>
        <a onClick={() => this.handleUpdate(record)}>编辑</a>
        <Divider type="vertical" />
        <a onClick={() => this.showConfirm(record._id)}>删除</a>
      </span>
      )}
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/fetchAll',
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
      status: 'create',
    });
  };

  hideModal = () => {
    this.setState({ visible: false, formData: {}, });
  };

  handleSubmit = () => {
    const form = this.formRef.props.form;
    const { status, formData } = this.state;
    const { dispatch } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      if (status ==='create'){
        dispatch({
          type: 'admin/create',
          payload: values,
        });
      } else {
        dispatch({
          type: 'admin/update',
          payload: {
            id: formData._id,
            data: values
          },
        });
      }
      this.setState({ visible: false });
    });
  };

  handleUpdate = (record) => {
    const { dispatch } = this.props;
    this.setState({
      visible: true,
      status: 'update',
      formData: record || {},
    });
    dispatch({
      type: 'admin/fetchRoles',
    });
  };

  handleRemove = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/remove',
      payload: id,
    });
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  showConfirm = (id) =>{
    Modal.confirm({
      icon: <Icon type="exclamation-circle" />,
      title: '警告',
      content: '此操作讲彻底删除该项，且无法回复，请谨慎操作',
      okText: '确认',
      cancelText: '取消',
      onOk: ()=> {this.handleRemove(id)}
    });
  };

  render(){
    const { admin } = this.props;
    const { visible, formData, status } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal} style={{marginBottom: '20px'}}>新增</Button>
        <CreateForm
          wrappedComponentRef={this.saveFormRef}
          status={status}
          visible={visible}
          onCancel={this.hideModal}
          onCreate={this.handleSubmit}
          value={formData}
        />
        <Table style={{backgroundColor: '#fff'}} columns={this.columns} dataSource={admin.list} pagination={false} rowKey={record => record._id} />
      </div>
    )
  }
}

@connect(({ admin }) => ({ admin }))
@Form.create()
class CreateForm extends React.Component {

  selectFocus = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/fetchRoles',
    });
  };

  render() {
    const { visible, status, onCancel, onCreate, form, value, admin } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        width={460}
        visible={visible}
        title={status==='create'? "新增管理用户": "更新管理用户"}
        okText={status==='create'? "新增": "更新"}
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form className={styles.form}>
          <Form.Item label="用户昵称">
            {getFieldDecorator('username', {
              initialValue: value.username,
              rules: [{ required: true, message: '用户昵称不能为空!' }],
            })(
              <Input placeholder="用户昵称" />
            )}
          </Form.Item>
          <Form.Item label="电话号码">
            {getFieldDecorator('mobile', {
              initialValue: value.mobile,
              rules: [{ required: true, message: '电话号码不能为空!' }],
            })(
              <Input placeholder="电话号码" />
            )}
          </Form.Item>
          <Form.Item label="邮箱账号">
            {getFieldDecorator('email', {
              initialValue: value.email,
              rules: [{ required: true, message: '邮箱不能为空!' }],
            })(
              <Input placeholder="邮箱账号" />
            )}
          </Form.Item>
          <Form.Item label="用户密码">
            {getFieldDecorator('password', {
              initialValue: status==='create'? null : 'tescoDefaultPassword',
              rules: [{ required: true, message: '密码不能为空!' }],
            })(
              <Input type='password' placeholder="密码" />
            )}
          </Form.Item>
          <Form.Item label="用户角色">
            {getFieldDecorator('role', {
              initialValue: value.role && value.role._id,
              rules: [{ required: true, message: '用户角色不能为空!' }],
            })(
              <Select placeholder="请选择角色" onFocus={this.selectFocus} style={{width: '412px'}}>
                { admin.roles.map(item => (
                  <Option value={item._id} key={item.name}>{item.description}</Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Admin;
