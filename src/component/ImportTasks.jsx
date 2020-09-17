/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Upload, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { SERVER_URL } from '../config'

const Uploader = () => {
  const props = {
    name: 'file',
    action: `${SERVER_URL}/tasks/import`,
    showUploadList: false,
    beforeUpload: (file) => {
      console.log(file.type)
      if (file.type !== 'application/json') {
        message.error(`${file.name} is not a json file`)
      }
      return file.type === 'application/json'
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }
  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Import json</Button>
    </Upload>
  )
}

export default Uploader
