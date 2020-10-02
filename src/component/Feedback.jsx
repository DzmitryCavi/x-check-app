import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { v4 as uuid } from 'uuid'
import { format } from 'date-fns'
import { Comment, Avatar, Form, Button, List, Input } from 'antd'
import { connect } from 'react-redux'
import requestService from '../services/requests.service'

const { TextArea } = Input

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={(props) => {
      return <Comment {...props} />
    }}
  />
)

CommentList.propTypes = {
  comments: PropTypes.instanceOf(Array).isRequired,
}

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Feedback
      </Button>
    </Form.Item>
  </>
)

Editor.propTypes = {
  onChange: PropTypes.instanceOf(Function).isRequired,
  onSubmit: PropTypes.instanceOf(Function).isRequired,
  submitting: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
}

const FeedBack = ({ feedback, user, requestId }) => {
  const [comments, setComments] = useState(feedback)
  const [submitting, setSubmitting] = useState(false)
  const [value, setValue] = useState('')

  useEffect(() => {
    requestService.edit({ feedback: comments }, requestId)
  }, [comments, requestId])

  const handleSubmit = () => {
    if (!value) {
      return
    }

    setSubmitting(true)

    setTimeout(() => {
      setComments([
        ...comments,
        {
          author: user.login,
          avatar: user.avatar_url,
          content: value,
          datetime: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
          id: uuid(),
        },
      ])

      setSubmitting(false)
      setValue('')
    }, 1000)
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <>
      {comments.length > 0 && <CommentList comments={comments} />}
      <Comment
        avatar={<Avatar src={user.avatar_url} alt={user.login} />}
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    </>
  )
}

FeedBack.propTypes = {
  feedback: PropTypes.instanceOf(Array),
  user: PropTypes.instanceOf(Object).isRequired,
  requestId: PropTypes.string.isRequired,
}

FeedBack.defaultProps = {
  feedback: [],
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
})

export default connect(mapStateToProps)(FeedBack)
