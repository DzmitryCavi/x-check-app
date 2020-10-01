import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Collapse, Empty, Form, Input, Result, Select, Space, Typography } from 'antd'
import {
  ApartmentOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  RollbackOutlined,
  SaveOutlined,
} from '@ant-design/icons'
import { formatRoute } from 'react-router-named-routes'

import AntdTinymce from '../../../component/AntdTinymce'
import NumericInput from '../../../component/NumericInput'
import ButtonLink from '../../../component/ButtonLink'
import { authorRoutes } from '../../../router/routes'
import tasksService from '../../../services/tasks.service'

const { TextArea } = Input
const { Title } = Typography

const validateMessages = {
  required: 'Required',
}

const availabilities = [
  { key: 'mentor', label: 'Mentor' },
  { key: 'student', label: 'Student' },
]

const TaskViewImport = ({ history, location, user }) => {
  const [form] = Form.useForm()
  const [saveTask, setSaveTask] = useState(null)
  const { task } = location.state

  const saveImportTask = async (name, info) => {
    const { task: taskForm, ...forms } = info.forms
    const resultTask = {
      ...taskForm.getFieldsValue(['title', 'description']),
      categories: [],
    }
    Object.keys(forms).forEach((formName) => {
      resultTask.categories.push(
        forms[formName].getFieldsValue(['title', 'description', 'criteria']),
      )
    })

    const data = await tasksService.create(resultTask, user.id)

    setSaveTask(data)
  }

  if (!task)
    return (
      <Empty description="Task not found :(">
        <ButtonLink type="primary" linkTo={authorRoutes.tasks.create}>
          Create Now
        </ButtonLink>
      </Empty>
    )

  return (
    <div className="task-view-page">
      <h1 className="page-title">Preview Import Task: {task.title}</h1>
      {!saveTask ? (
        <div className="task">
          <div className="task__body">
            <div className="d-flex justify-content-start">
              <Space className="mb-2">
                <Button type="primary" icon={<SaveOutlined />} onClick={() => form.submit()}>
                  Save
                </Button>
                <Button type="default" icon={<RollbackOutlined />} onClick={() => history.goBack()}>
                  Cancel
                </Button>
              </Space>
            </div>

            <Form.Provider onFormFinish={saveImportTask}>
              <Form
                form={form}
                name="task"
                layout="vertical"
                initialValues={task}
                validateMessages={validateMessages}
              >
                <Form.Item
                  name="title"
                  label="Title"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item name="description" label="Description">
                  <AntdTinymce options={{ height: 360 }} />
                </Form.Item>
              </Form>
              <Title level={3}>Categories:</Title>
              <Collapse>
                {task.categories.map((category, catIdx) => (
                  <Collapse.Panel
                    header={
                      <>
                        {category.title}&nbsp;
                        <b>({category.criteria.length} criteria)</b>
                      </>
                    }
                    key={`category-${catIdx + 1}`}
                    forceRender
                  >
                    <Form
                      name={`category-${catIdx + 1}`}
                      layout="vertical"
                      initialValues={category}
                      validateMessages={validateMessages}
                    >
                      <Form.Item
                        name="title"
                        label="Title"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item name="description" label="Description">
                        <TextArea rows={5} />
                      </Form.Item>

                      <Form.Item
                        name="criteria"
                        label="Criteria"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Form.List name="criteria">
                          {(fields, { add, remove }) => {
                            return (
                              <div>
                                {fields.map((field) => (
                                  <div className="category-item" key={field.key}>
                                    <div className="category-items-list">
                                      <div className="category-items-list__item category-items-list__item--availability">
                                        <Form.Item
                                          {...field}
                                          style={{ marginBottom: 0 }}
                                          name={[field.name, 'availability']}
                                          fieldKey={[field.fieldKey, 'availability']}
                                        >
                                          <Select mode="tags" placeholder="Available to all">
                                            {availabilities.map((availability) => (
                                              <Select.Option key={availability.key}>
                                                {availability.label}
                                              </Select.Option>
                                            ))}
                                          </Select>
                                        </Form.Item>
                                      </div>
                                      <div className="category-items-list__item category-items-list__item--score">
                                        <Form.Item
                                          {...field}
                                          style={{ marginBottom: 0 }}
                                          name={[field.name, 'score']}
                                          fieldKey={[field.fieldKey, 'score']}
                                          rules={[{ required: true, message: 'Missing score' }]}
                                        >
                                          <NumericInput placeholder="Score" />
                                        </Form.Item>
                                      </div>
                                      <div className="category-items-list__item category-items-list__item--text">
                                        <Form.Item
                                          {...field}
                                          style={{ marginBottom: 0 }}
                                          name={[field.name, 'text']}
                                          fieldKey={[field.fieldKey, 'text']}
                                          rules={[{ required: true, message: 'Missing text' }]}
                                        >
                                          <AntdTinymce
                                            isQuickBars
                                            options={{
                                              inline: true,
                                              quickbars_insert_toolbar:
                                                'bullist numlist outdent indent | quicklink',
                                              quickbars_selection_toolbar:
                                                'bold italic underline | formatselect | blockquote quicklink | code',
                                            }}
                                            menubar={false}
                                            toolbar={[]}
                                          />
                                        </Form.Item>
                                      </div>
                                    </div>
                                    <div className="category-item__remove">
                                      <MinusCircleOutlined
                                        onClick={() => {
                                          remove(field.name)
                                        }}
                                      />
                                    </div>
                                  </div>
                                ))}

                                <Form.Item>
                                  <Button
                                    type="dashed"
                                    onClick={() => {
                                      add()
                                    }}
                                    block
                                  >
                                    <PlusOutlined /> Add item
                                  </Button>
                                </Form.Item>
                              </div>
                            )
                          }}
                        </Form.List>
                      </Form.Item>
                    </Form>
                  </Collapse.Panel>
                ))}
              </Collapse>
            </Form.Provider>

            <div className="d-flex justify-content-start">
              <Space className="mt-3">
                <Button type="primary" icon={<SaveOutlined />} onClick={() => form.submit()}>
                  Save
                </Button>
                <Button type="default" icon={<RollbackOutlined />} onClick={() => history.goBack()}>
                  Cancel
                </Button>
              </Space>
            </div>
          </div>
        </div>
      ) : (
        <Result
          status="success"
          title="Import task successfully!"
          subTitle={`Task name: ${saveTask.title}.`}
          extra={[
            <Button key="task-create" type="primary" onClick={() => setSaveTask(null)}>
              Create New Task
            </Button>,
            <ButtonLink
              key="tasks-list"
              type="default"
              icon={<ApartmentOutlined />}
              linkTo={authorRoutes.tasks.list}
            >
              Go Tasks List
            </ButtonLink>,
            <ButtonLink
              key="category-create"
              type="primary"
              icon={<PlusOutlined />}
              linkTo={formatRoute(authorRoutes.tasks.view, { taskId: saveTask.id })}
            >
              Task View
            </ButtonLink>,
          ]}
        />
      )}
    </div>
  )
}

TaskViewImport.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
}

TaskViewImport.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps, null)(TaskViewImport)
