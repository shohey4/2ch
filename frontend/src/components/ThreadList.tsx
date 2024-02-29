import React, { useEffect, useState } from 'react';
import ThreadItem from './ThreadItem';
import { Thread } from '../types';
import axios from 'axios';

interface ThreadListProps {
  isPosted: boolean;
  resetIsPosted: () => void;
}

const ThreadList: React.FC<ThreadListProps> = ({
  isPosted,
  resetIsPosted,
}) => {
  const [threads, setThreads] = useState<Thread[]>([]);

  const url = 'http://127.0.0.1:8000/threads/';

  useEffect(() => {
    const fetchThreads = async () => {
      const response = await axios.get<Thread[]>(url);
      setThreads(response.data);
    };
    fetchThreads();
    resetIsPosted();
  }, [isPosted]);

  return (
    <div className="flex justify-center">
      <div className="m-3 flex flex-col w-full overflow-auto md:w-5/6">
        <div className="w-full text-2xl mb-2">スレッド一覧</div>
        <div className="overflow-auto flex flex-col">
          {threads.map((thread) => (
            <ThreadItem key={thread.id} thread={thread} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThreadList;
