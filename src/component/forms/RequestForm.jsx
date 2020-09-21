/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form, notification, Spin, Button, Input, Typography } from 'antd'
import RequestFormItem from './RequestFormItem'
import requestsService from '../../services/requests.service'
import { urlWithIpPattern } from '../../services/validators'

const { Title } = Typography

const RequestForm = ({ task, user, requestToEdit }) => {
  const { categories } = task
  const [form] = Form.useForm()

  const onFinish = async (data) => {
    const requestData = { name: task.title, task: task.id, ...data, state: 'PUBLISHED' }
    if (requestToEdit) requestsService.edit(requestData, requestToEdit.id)
    else requestsService.create(requestData, user)
    notification.success({
      className: 'app-notification app-notification--success',
      message: 'Success',
      description: 'Request sent successfully...',
    })
  }

  const onSave = async () => {
    const requestData = {
      name: task.title,
      task: task.id,
      ...form.getFieldsValue(),
      state: 'PENDING',
    }
    if (requestToEdit) requestsService.edit(requestData, requestToEdit.id)
    else requestsService.create(requestData, user)
    notification.success({
      className: 'app-notification app-notification--success',
      message: 'Success',
      description: 'Data from request saved...',
    })
  }

  return (
    <div className="task-create-page">
      <Title level={2}>Запрос на проверку задания - {task.title}</Title>
      <Form form={form} layout="vertical" onFinish={onFinish} initialValues={requestToEdit || {}}>
        <Form.Item
          name="url"
          label="Solution URL"
          rules={[
            { required: true, pattern: urlWithIpPattern, message: 'Please provide a valid link' },
          ]}
        >
          <Input />
        </Form.Item>
        <Title level={3}>Самопроверка</Title>
        {categories ? (
          categories.map((category) => (
            <div key={category.id}>
              <div>{category.title}</div>
              {category.criteria.map((item, index) => (
                <div key={`criteria-${index + 1}`}>
                  <Form.Item
                    name={['selfGrade', category.title, index]}
                    label={`${item.text} (0-${item.score})`}
                    rules={[{ required: true, message: 'Please grade all' }]}
                  >
                    <RequestFormItem maxScore={item.score} />
                  </Form.Item>
                </div>
              ))}
            </div>
          ))
        ) : (
          <Spin size="large" />
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Отправить
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={onSave} danger>
            Сохранить (не отправляя)
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

RequestForm.propTypes = {
  task: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.string.isRequired,
  requestToEdit: PropTypes.instanceOf(Object),
}

RequestForm.defaultProps = {
  requestToEdit: null,
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user.login,
  }
}

export default connect(mapStateToProps, null)(RequestForm)
