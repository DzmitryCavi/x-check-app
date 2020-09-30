import React from 'react'
import { v4 as uuid } from 'uuid'
import PropTypes from 'prop-types'
import { Button, Collapse, Empty, Form, Input, Select, Space, Typography } from 'antd'
import {
  MinusCircleOutlined,
  PlusOutlined,
  RollbackOutlined,
  SaveOutlined,
} from '@ant-design/icons'
import AntdTinymce from '../../../component/AntdTinymce'
import NumericInput from '../../../component/NumericInput'
import ButtonLink from '../../../component/ButtonLink'
import { authorRoutes } from '../../../router/routes'

const { TextArea } = Input
const { Title } = Typography

const validateMessages = {
  required: 'Required',
}

const availabilities = [
  { key: 'mentor', label: 'Mentor' },
  { key: 'student', label: 'Student' },
]

const TaskViewImport = ({ history, location }) => {
  const [form] = Form.useForm()
  const { task } = location.state

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
      <div className="task">
        <div className="task__body">
          <div className="d-flex justify-content-start">
            <Button className="mb-2" type="primary" onClick={() => form.submit()}>
              Save
            </Button>
          </div>

          <Form.Provider
            onFormFinish={(name, info) => {
              const { task: taskForm, ...forms } = info.forms
              const resultTask = {
                ...taskForm.getFieldsValue(['title', 'description']),
                categories: [],
              }
              Object.keys(forms).forEach((formName) => {
                resultTask.categories.push({
                  ...forms[formName].getFieldsValue(['title', 'description', 'criteria']),
                  id: uuid(),
                })
              })

              console.log(resultTask)
              alert('В разработке...')
            }}
          >
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
            <Space>
              <Button
                className="mt-3"
                type="primary"
                icon={<SaveOutlined />}
                onClick={() => form.submit()}
              >
                Save
              </Button>
              <Button
                className="mt-3"
                type="default"
                icon={<RollbackOutlined />}
                onClick={() => history.goBack()}
              >
                Cancel
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </div>
  )
}

TaskViewImport.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
}

export default TaskViewImport
