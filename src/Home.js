import React, { useState } from 'react'
import { json } from 'react-router-dom'

const Home = () => {
  const [text, setText] = useState('')
  const [responseText, setResponseText] = useState('')
  const [loading, setLoading] = useState(false)
  const [display, setDisplay] = useState(false)

  const handleInputChange = (event) => {
    setText(event.target.value)
  }

  const handleSubmit = async (event) => {
    setLoading(true)
    setDisplay(true)
    try {
      const res = await query({ text: text })

      if (res.summary) {
        setResponseText(res.summary)
      }
    } catch {
      setResponseText('Xảy ra lỗi. Vui lòng thử lại')
    } finally {
      setLoading(false)
    }
  }

  async function query(data) {
    //await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await fetch(
      'https://8a00-171-243-48-201.ngrok-free.app/summrize',
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    console.log(response)
    const result = await response.json()
    return result
  }

  return (
    <div className="home-container">
      <div className="home-title">Mô hình tóm tắt văn bản</div>
      <div className="home-body">
        <div className="summarize-container">
          <textarea
            className="input-textarea"
            id="autoResizableTextarea"
            placeholder="Nhập đoạn văn cần tóm tắt vào đây..."
            value={text}
            onChange={handleInputChange}
          />
        </div>
        <div className="submit-button" onClick={handleSubmit}>
          Tóm tắt
        </div>
        <div className="response-container">
          {!loading && display && (
            <textarea
              className="response-textarea"
              id="responseTextarea"
              value={responseText}
              readOnly
            />
          )}

          {loading && display && (
            <div className="loading-message">Đang tóm tắt. Vui lòng đợi...</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
