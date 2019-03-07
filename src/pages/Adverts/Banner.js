/*
 * banner图管理
 * @Author: Miracle
 * @Description: 后面需要组成添加广告是选择开始时间和结束时间， 通过时间来判断活动开始还是结束， 支持人工干预
 */
import React, { Component } from 'react';
import { Upload, Table, Icon, message, Divider, Badge, Form, Input, Select, Button, DatePicker, Modal } from 'antd';
import moment from 'moment'
// import { formatMessage, FormattedMessage } from 'umi/locale';
import { connect } from 'dva';
import styles from './Adverts.less';

function beforeUpload(file) {
  const imageType = ['image/jpeg', 'image/png', 'image/gif'];
  const isJPG = imageType.includes(file.type);
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片必须小于2MB!');
  }
  return isJPG && isLt2M;
}
const serverIp = 'http://127.0.0.1:7001';
const { Option } = Select;
const { RangePicker } = DatePicker;
const statusMap = ['default', 'processing', 'success'];
const status = ['未开始', '进行中', '已结束'];
const platform = ['pc', '移动'];
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

@connect(({ adverts, loading }) => ({
  adverts,
  loading: loading.effects['adverts/fetch'],
}))
@Form.create()
class Banner extends Component{
  state = {
    loading: false,
    visible: false,
    modelStatus: 'create',
    formData: {}
  };

  columns = [
    { title: '图片', dataIndex: 'url', key: 'url', render(val) {
        return <img src={serverIp+val} alt="图片" style={{width: '80px'}} />;
      }},
    { title: '标题', dataIndex: 'title', key: 'title' },
    { title: '平台', dataIndex: 'platform', key: 'platform', render(val){return<span>{platform[val]}</span>} },
    { title: '地址', dataIndex: 'href', key: 'href' },
    { title: '状态', key: 'status', dataIndex: 'status', render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      }
    },
    { title: '开始时间', key: 'beginTime', dataIndex: 'beginTime', render(val) {
        return <span>{moment(val).format('YYYY-MM-DD')}</span>;
      }
    },
    { title: '结束时间', key: 'endTime', dataIndex: 'endTime', render(val) {
        return <span>{moment(val).format('YYYY-MM-DD')}</span>;
      }
    },
    { title: '操作', key: 'action',
      render: (record) => (
        <span>
          <a onClick={() => this.handleUpdate(record)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => this.showConfirm(record._id)}>删除</a>
        </span>
      ),
    }
  ];

  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type: 'adverts/fetch'
    })
  }


  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({
        imageUrl: info.file.response.url,
        loading: false,
      });
    }
  };

  handleUpdate = (record) => {
    this.setState({
      visible: true,
      modelStatus: 'update',
      imageUrl: record.url,
      formData: record || {},
    });
  };

  handleRemove = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'adverts/remove',
      payload: id,
    });
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

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    const { modelStatus, formData } = this.state;
    const { dispatch, form } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      // 处理图片
      const  url = typeof values.url === 'object' ? values.url.file.response.url : values.url;
      const beginTime = values.time[0]._d.getTime();
      const endTime = values.time[1]._d.getTime();
      const data = Object.assign(values, {url, beginTime, endTime});
      delete data.time;
      if (modelStatus ==='create'){
        dispatch({
          type: 'adverts/create',
          payload: data,
        });
      } else {
        dispatch({
          type: 'adverts/update',
          payload: {
            id: formData._id,
            data
          },
        });
      }
      this.setState({ visible: false });
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      formData: {},
    });
  };

  render() {
    const { loading, imageUrl, visible, modelStatus, formData } = this.state;
    const { form, adverts } = this.props;
    const { getFieldDecorator } = form;
    const uploadButton = (
      <div>
        <Icon type={loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className={styles.container}>
        <Form className={styles['search-box']} layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item label='标题'>
            <Input placeholder='请输入关键词' />
          </Form.Item>

          <Form.Item label="活动状态">
            <Select placeholder='全部类型' style={{ width: 120 }} onChange={console.log('2')}>
              <Option value="0">未开始</Option>
              <Option value="1">进行中</Option>
              <Option value="2">已结束</Option>
            </Select>
          </Form.Item>

          <Form.Item label="活动时间">
            <RangePicker onChange={()=>{console.log('data')}} />
          </Form.Item>

          <Button className={styles.btn} type="primary">筛选</Button>
          <Button className={styles.btn}>重置</Button>
        </Form>
        <Button icon="plus" type="primary" onClick={this.showModal}> 新建 </Button>

        <Table columns={this.columns} dataSource={adverts.list} className={styles.table} rowKey={record => record._id} />
        <Modal
          width={445}
          title={modelStatus==='create'? '新增': '更新'}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <Form.Item {...formItemLayout} label="标题">
              {getFieldDecorator('title', {
                initialValue: formData.title,
                rules: [{ required: true, message: '标题不能为空!' }],
              })(
                <Input placeholder="标题" />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="外链">
              {getFieldDecorator('href', {
                initialValue: formData.href,
                rules: [{ required: true, message: '链接不能为空!' }],
              })(
                <Input placeholder="链接" />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="平台">
              {getFieldDecorator('platform', {
                initialValue: formData.platform,
                rules: [{ required: true, message: '所属平台不能为空!' }],
              })(
                <Select placeholder="请选择平台" onFocus={this.selectFocus}>
                  <Option value={0} key='pc'>PC端</Option>
                  <Option value={1} key='mobile'>移动端</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="状态">
              {getFieldDecorator('status', {
                initialValue: formData.status,
                rules: [{ required: true, message: '状态不能为空!' }],
              })(
                <Select placeholder="请选择状态" onFocus={this.selectFocus}>
                  <Option value={0} key='not'>未开始</Option>
                  <Option value={1} key='underway'>进行中</Option>
                  <Option value={2} key='over'>已结束</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="活动时间">
              {getFieldDecorator('time', {
                initialValue: formData.beginTime ? [moment(formData.beginTime), moment(formData.endTime)] : '',
              })(
                <RangePicker />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="活动描述">
              {getFieldDecorator('description', {
                initialValue: formData.description,
              })(
                <Input.TextArea placeholder='描述' autosize={{ minRows: 2, maxRows: 6 }} />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="图像">
              {getFieldDecorator('url', {
                initialValue: formData.url,
                rules: [{ required: true, message: '图像不能为空!' }],
              })(
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className={styles['avatar-uploader']}
                  showUploadList={false}
                  action="/api/admin/upload"
                  headers={{'x-csrf-token': 'pro7x9vQzfE-ek7foijinoSW'}}
                  beforeUpload={beforeUpload}
                  onChange={this.handleChange}
                >
                  {imageUrl ? <img src={`${serverIp}${imageUrl}`} alt="avatar" /> : uploadButton}
                </Upload>
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Banner;
