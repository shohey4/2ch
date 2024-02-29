import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';
import { Post, Thread } from '../types';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface PostListProps {
  thread: Thread;
  isPosted: boolean;
  resetIsPosted: () => void;
}

const PostList: React.FC<PostListProps> = ({
  thread: { title, countPosts },
  isPosted,
  resetIsPosted,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const url = 'http://127.0.0.1:8000/threads/';

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get<Post[]>(url + id + '/posts/');
      setPosts(response.data);
    };
    fetchPosts();
    resetIsPosted();
  }, [isPosted]);

  return (
    <div className="grow flex justify-center">
      <div className="m-3 flex flex-col w-full overflow-auto md:w-5/6">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold mb-2">{title}</div>
          <div className="">投稿数:{countPosts}</div>
        </div>
        <div className="overflow-auto flex flex-col divide-y divide-gray-300">
          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostList;
