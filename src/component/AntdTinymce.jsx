/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'
import { Editor } from '@tinymce/tinymce-react'
import { TINYMCE_KEY } from '../config'

let defaultPlugins = [
  'code advlist autolink lists link image charmap print preview anchor hr',
  'searchreplace visualblocks code fullscreen',
  'insertdatetime media table paste code wordcount',
]
let defaultMenubar = 'file edit view insert format tools table tc'
let defaultToolbar = [
  'formatselect bold italic underline forecolor',
  'alignleft aligncenter alignright alignjustify bullist numlist outdent indent',
  'link',
  'undo redo',
  'hr fullscreen',
  'code',
].join('|')
let defaultOptions = {
  menubar: false,
}

let apiKey = TINYMCE_KEY

const AntdTinymce = (props) => {
  const { value, onChange, isQuickBars, plugins, menubar, toolbar, options = {} } = props
  const initOptions = { ...defaultOptions, ...options }

  const onEditorChange = (newContent) => {
    if (onChange) {
      onChange(newContent)
    }
  }

  return (
    <Editor
      apiKey={apiKey}
      init={{
        plugins: isQuickBars ? plugins.concat(['quickbars']) : plugins,
        menubar: menubar || defaultMenubar,
        toolbar: toolbar || defaultToolbar,
        ...initOptions,
      }}
      initialValue={value}
      onEditorChange={onEditorChange}
    />
  )
}

AntdTinymce.config = (key) => {
  apiKey = key
}
AntdTinymce.setDefaultPlugins = (plugins) => {
  defaultPlugins = plugins
}
AntdTinymce.setDefaultMenubar = (menubar) => {
  defaultMenubar = menubar
}
AntdTinymce.setDefaultToolbar = (toolbar) => {
  defaultToolbar = toolbar
}
AntdTinymce.setDefaultOptions = (options) => {
  defaultOptions = options
}

AntdTinymce.defaultProps = {
  isQuickBars: false,
  plugins: defaultPlugins,
  toolbar: false,
  menubar: false,
  options: {},
  onChange: () => {},
  value: '',
}

AntdTinymce.propTypes = {
  isQuickBars: PropTypes.bool,
  plugins: PropTypes.instanceOf(Array),
  toolbar: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  options: PropTypes.instanceOf(Object),
  menubar: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Object)]),
}

export default AntdTinymce
