import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Thread } from '../types';
import DateTimeDisplay from './DateTimeDisplay';

interface ThreadItemProps {
  thread: Thread;
}

const ThreadItem: React.FC<ThreadItemProps> = ({ thread }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/thread/${thread.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className=" bg-gray-200 px-5 py-2 m-1 hover:bg-gray-300 rounded-md cursor-pointer"
    >
      <div className="flex justify-between">
        <div className="text-2xl text-bold py-1">{thread.title}</div>
        <div className="text-base">{thread.countPosts} posts</div>
      </div>

      <div className="flex text-sm">
        <div className="mr-2">作成:</div>
        <DateTimeDisplay dateTimeString={thread.createdAt} />
        <div className="ml-5 mr-2">更新: </div>
        <DateTimeDisplay dateTimeString={thread.updatedAt} />
      </div>
      {/* TODO 投稿数表示 */}
    </div>
  );
};

export default ThreadItem;
