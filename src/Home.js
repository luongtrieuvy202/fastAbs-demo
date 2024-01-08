import React, { useState } from 'react';
import { json } from 'react-router-dom';

const Home = () => {
  const [text, setText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = async (event) => {
    setText(event.target.value);
    autoResize(); 
    if (event.key === 'Enter') {
        setLoading(true);
  
        try {
          const res = await query({ "inputs": text });
  
          if (res[0].summary_text) {
            setResponseText(res[0].summary_text);
          }
        } catch {
          setResponseText('Xảy ra lỗi. Vui lòng thử lại');
        } finally {
          setLoading(false);
        }
      }
  };

  const autoResize = () => {
    const textarea = document.getElementById('autoResizableTextarea');
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height to auto to calculate the new height
      textarea.style.height = textarea.scrollHeight + 'px'; // Set the new height
    }
  };

  async function query(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/VietAI/vit5-large-vietnews-summarization",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  }

  return (
    <div className='home-container'>
      <div className='home-title'>Nhập đoạn văn cần tóm tắt vào đây</div>
      <div className='home-body'>
        <textarea
          className='input-textarea'
          id='autoResizableTextarea'
          placeholder='Enter text here...'
          value={text}
          onChange={handleInputChange}
          onKeyDown={handleInputChange} // Listen for keydown event
        />
       <div className='response-container'>
          {loading ? (
            <div className='loading-message'>Đang tóm tắt. Vui lòng đợi...</div>
          ) : (
            <textarea
              className='response-textarea'
              id='responseTextarea'
              value={responseText}
              readOnly
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

