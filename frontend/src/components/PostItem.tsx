import React from 'react';
import { Post } from '../types';
import DateTimeDisplay from './DateTimeDisplay';
import MultiLineText from './MultiLineText';

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <div className="flex flex-col bg-gray-200 px-5 py-3">
      <div className="flex text-blue-800 text-sm">
        <div className="font-bold mr-2 text-base ">{post.postId}</div>
        <div className="flex flex-wrap">
          <div className="font-bold mr-1">{post.userName}</div>
          <div className="mr-1">{post.email}</div>
          <div className="mr-1">
            <DateTimeDisplay dateTimeString={post.createdAt} />
          </div>
          <div className="">{post.userId}</div>
        </div>
      </div>
      <div className="text-md">
        <MultiLineText body={post.content} />
      </div>

      {/* TODO 投稿数表示 */}
    </div>
  );
};

export default PostItem;
