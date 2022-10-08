import React, { useEffect, useRef, useState } from 'react';
import { submitComment } from '../services';

const CommentForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const commentRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const storeDataRef = useRef();

  useEffect(() => {
    nameRef.current.value = window.localStorage.getItem('name');
    emailRef.current.value = window.localStorage.getItem('email');
  }, []);

  const handleCommentSubmit = () => {
    setError(false);

    const { value: comment } = commentRef.current;
    const { value: name } = nameRef.current;
    const { value: email } = emailRef.current;
    const { checked: storeData } = storeDataRef.current;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObj = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData) {
      window.localStorage.setItem('name', name);
      window.localStorage.setItem('email', email);
    } else {
      window.localStorage.removeItem('name', name);
      window.localStorage.removeItem('email', email);
    }

    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });
  };

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
      <h1 className='text-xl mb-8 font-semibold border-b pb-4'>
        Leave a Comment
      </h1>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <textarea
          className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
          ref={commentRef}
          placeholder='Comment'
          name='comment'
        />
      </div>
      <div className='grid grid-cols-1  lg:grid-cols-2 gap-4 mb-4'>
        <input
          className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
          type='text'
          ref={nameRef}
          placeholder='Name'
          name='name'
        />
        <input
          className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
          type='email'
          ref={emailRef}
          placeholder='Email'
          name='email'
        />
      </div>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <div>
          <input
            ref={storeDataRef}
            type='checkbox'
            id='storeData'
            name='storeData'
            value='true'
          />
          <label
            className='ml-2 text-gray-500 cursor-pointer'
            htmlFor='storeData'
          >
            Save my e-mail and name for the next time.
          </label>
        </div>
      </div>
      {error && (
        <p className='text-xs text-red-500'>All fields are required.</p>
      )}
      <div className='mt-8'>
        <button
          className='transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer'
          type='button'
          onClick={handleCommentSubmit}
        >
          Post comment
        </button>
        {showSuccessMessage && (
          <span className='text-xl float-right font-semibold mt-3 text-green-500'>
            Comment submitted.
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentForm;
