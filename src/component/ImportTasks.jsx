import React from 'react'
import PropTypes from 'prop-types'
import { Upload, message } from 'antd'
import tasksService from '../services/tasks.service'

const Uploader = ({ authorId, label, type, onImportSuccess }) => {
  async function importFile({ onSuccess, onError, file }) {
    try {
      const data = await tasksService.importTasks(file, authorId, type)

      onSuccess(data, file)
    } catch (error) {
      onError()
    }
  }

  const props = {
    name: 'file',
    showUploadList: false,
    customRequest: importFile,
    beforeUpload: (file) => {
      message.loading({ content: 'Loading...', key: 'imported' })

      if (['custom', 'rss'].includes(type) && file.type !== 'application/json') {
        message.error({ content: `${file.name} is not a json file`, key: 'imported' })
        return false
      }
      if (type === 'md' && file.name.split('.').pop() !== 'md') {
        message.error({ content: `${file.name} is not a markdown file`, key: 'imported' })
        return false
      }
      return true
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success({
          content: `${info.file.name} file uploaded successfully`,
          key: 'imported',
        })

        onImportSuccess(info.file.response)
      } else if (info.file.status === 'error') {
        message.error({ content: `${info.file.name} file upload failed.`, key: 'imported' })
      }
    },
  }

  return <Upload {...props}>{label}</Upload>
}

Uploader.defaultProps = {
  label: 'Import',
  type: 'rss',
  onImportSuccess: () => {},
}

Uploader.propTypes = {
  authorId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  onImportSuccess: PropTypes.func,
}

export default Uploader
