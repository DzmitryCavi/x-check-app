/* eslint-disable */

import React, { Component } from 'react'
import { Tree } from 'antd'
import {
  CarryOutOutlined,
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  MinusOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import parse from 'react-html-parser'

import styles from './EditableTree.scss'

class EditableTree extends Component {
  constructor(props) {
    super()

    console.log(props)

    this.state = {
      data: props.categories.map((category, catIdx) => ({
        ...category,
        key: catIdx,
        defaultTitle: category.title,
        isEditable: false,
        criteria: category.criteria.map((criterion, crIdx) => ({
          ...criterion,
          key: `${catIdx}-${crIdx}`,
          textDefault: criterion.text,
          scoreDefault: criterion.score,
          isEditable: false,
        })),
      })),
    }
  }

  renderNode(isEditable, data, type) {
    return {
      key: data.key,
      title: isEditable ? (
        <div>
          <input
            className={styles.inputField}
            value={type === 'category' ? data.title : data.text}
            onChange={(e) => this.onChange(e, data.key)}
          />
          <CloseOutlined
            style={{ marginLeft: 10 }}
            onClick={() =>
              this.onClose(data.key, type === 'category' ? data.defaultTitle : data.defaultText)
            }
          />
          <CheckOutlined style={{ marginLeft: 10 }} onClick={() => this.onSave(data.key)} />
        </div>
      ) : (
        <div className={styles.titleContainer}>
          <span>{type === 'category' ? data.title : data.text}</span>
          <span className={styles.operationField}>
            <EditOutlined style={{ marginLeft: 10 }} onClick={() => this.onEdit(data.key)} />
            <PlusOutlined style={{ marginLeft: 10 }} onClick={() => this.onAdd(data.key)} />
            <MinusOutlined style={{ marginLeft: 10 }} onClick={() => this.onDelete(data.key)} />
          </span>
        </div>
      ),
    }
  }

  renderTreeNodes = (categories) =>
    categories.map((category) => {
      return {
        ...this.renderNode(category.isEditable, category, 'category'),
        children: category.criteria.map((criterion) =>
          this.renderNode(criterion.isEditable, criterion, 'criterion'),
        ),
      }
    })

  onAdd = (e) => {
    console.log('add')
    // 防止expandedKeys重复
    // Tip: Must have, expandedKeys should not be reduplicative
    if (this.state.expandedKeys.indexOf(e) === -1) {
      this.expandedKeys.push(e)
    }
    this.addNode(e, this.data)
    this.setState({
      expandedKeys: this.expandedKeys,
      data: this.data,
    })
  }

  addNode = (key, data) =>
    data.map((item) => {
      if (item.key === key) {
        if (item.children) {
          item.children.push({
            value: 'default',
            defaultValue: 'default',
            key: key + Math.random(100), // 这个 key 应该是唯一的。 Tip: The key should be unique
            parentKey: key,
            isEditable: false,
          })
        } else {
          item.children = []
          item.children.push({
            value: 'default',
            defaultValue: 'default',
            key: key + Math.random(100),
            parentKey: key,
            isEditable: false,
          })
        }
        return
      }
      if (item.children) {
        this.addNode(key, item.children)
      }
    })

  onDelete = (key) => {
    console.log('delete')
    this.deleteNode(key, this.data)
    this.setState({
      data: this.data,
    })
  }

  deleteNode = (key, data) =>
    data.map((item, index) => {
      if (item.key === key) {
        data.splice(index, 1)
      } else if (item.children) {
        this.deleteNode(key, item.children)
      }
    })

  onEdit = (key) => {
    console.log('edit', key)
    this.setState({
      data: this.editNode(key, this.state.data),
    })
  }

  editNode = (key, data) =>
    data.map((item) => {
      let newItem
      if (item.criteria) {
        newItem = {
          ...item,
          criteria: this.editNode(key, item.criteria),
        }
      }

      if (item.key === key) newItem = { ...item, isEditable: true }
      else newItem = item
      return newItem
    })
  // data.map((item) => {
  //   if (item.key === key) {
  //     item.isEditable = true
  //   } else {
  //     item.isEditable = false
  //   }

  //   item.value = item.defaultValue
  //   if (item.criteria) {
  //     this.editNode(key, item.criteria)
  //   }
  // })

  onClose = (key, defaultValue) => {
    console.log('close')
    this.closeNode(key, defaultValue, this.data)
    this.setState({
      data: this.data,
    })
  }

  closeNode = (key, defaultValue, data) =>
    data.map((item) => {
      item.isEditable = false
      if (item.key === key) {
        item.value = defaultValue
      }
      if (item.children) {
        this.closeNode(key, defaultValue, item.children)
      }
    })

  onSave = (key) => {
    console.log('save')
    this.saveNode(key, this.data)
    this.setState({
      data: this.data,
    })
  }

  saveNode = (key, data) =>
    data.map((item) => {
      if (item.key === key) {
        item.defaultValue = item.value
      }
      if (item.children) {
        this.saveNode(key, item.children)
      }
      item.isEditable = false
    })

  onChange = (e, key) => {
    console.log('onchange')
    this.changeNode(key, e.target.value, this.data)
    this.setState({
      data: this.data,
    })
  }

  changeNode = (key, value, data) =>
    data.map((item) => {
      if (item.key === key) {
        item.value = value
      }
      if (item.children) {
        this.changeNode(key, value, item.children)
      }
    })

  render() {
    return (
      <div>
        <Tree
          showLine={<CarryOutOutlined />}
          treeData={this.renderTreeNodes(this.state.data)}
          defaultExpandAll
        />
      </div>
    )
  }
}

export default EditableTree
