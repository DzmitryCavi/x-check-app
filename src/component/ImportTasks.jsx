/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'
import { Upload, Button, message } from 'antd'
import { ImportOutlined } from '@ant-design/icons'
import tasksService from '../services/tasks.service'

const Uploader = ({ authorId }) => {
  async function importFile({ onSuccess, onError, file }) {
    try {
      await tasksService.importTasks(file, authorId)
      onSuccess(null, file)
    } catch (error) {
      onError()
    }
  }

  const props = {
    name: 'file',
    showUploadList: false,
    customRequest: importFile,
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
      <Button type="default" icon={<ImportOutlined />}>
        Import json
      </Button>
    </Upload>
  )
}

Uploader.propTypes = {
  authorId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default Uploader
