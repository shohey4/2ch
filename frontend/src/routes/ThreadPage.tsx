import React, { useEffect, useState } from 'react';
import PostList from '../components/PostList';
import CreatePost from '../components/CreatePost';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Thread } from '../types';

const ThreadPage: React.FC = () => {
  const [thread, setThread] = useState<Thread>();
  const [isPosted, setIsPosted] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const url = 'http://127.0.0.1:8000/threads/';

  const { id } = useParams<{ id: string }>();

  const handleOnPosted = () => {
    setIsPosted(true);
  };

  const handleResetIsPosted = () => {
    setIsPosted(false);
  };

  useEffect(() => {
    const fetchThread = async () => {
      const response = await axios.get<Thread>(url + id);
      setThread(response.data);
      setIsClosed(response.data.countPosts >= 1000 ? true : false);
    };
    fetchThread();
  }, [isPosted]);

  if (!thread) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <div className="flex flex-col mt-2 bg-slate-100 justify-between">
        <PostList
          thread={thread}
          isPosted={isPosted}
          resetIsPosted={handleResetIsPosted}
        />
        {/* {thread.countPosts ? (
          <div className="w-full text-2xl mb-2">スレッドは終了しました</div>
        ) : ( */}
        <CreatePost onPost={handleOnPosted} isClosed={isClosed} />
        {/* )} */}
      </div>
    </div>
  );
};

export default ThreadPage;
