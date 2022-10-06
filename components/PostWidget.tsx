import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getRecentPosts, getSimilarPosts } from '../services';

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) =>
        setRelatedPosts(result)
      );
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result));
    }
  }, [slug]);

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        {slug ? 'Reated Posts' : 'Recent Posts'}
      </h3>
      {relatedPosts.map((post) => (
        <div key={post.title} className='flex items-center w-full mb-4'>
          <div className='w-16 flex-none'>
            <img
              className='align-middle '
              src={post.featuredImage.url}
              alt={post.title}
              height='100px'
              width='100px'
            />
          </div>
          <div className='flex-grow ml-4'>
            <p className='text-gray-500 text-xs'>
              {moment(post.createdAt).format('MMM DD, YYYY')}
            </p>
            <Link
              key={post.title}
              className='text-md'
              href={`/post/${post.slug}`}
            >
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
