import React, { useState } from 'react';
import ThreadList from '../components/ThreadList';
import CreateThread from '../components/CreateThread';

const Home: React.FC = () => {
  const [isPosted, setIsPosted] = useState<boolean>(false);

  const handleOnPosted = () => {
    setIsPosted(true);
  };

  const handleResetIsPosted = () => {
    setIsPosted(false);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col mt-2 bg-slate-100 justify-between">
        <ThreadList isPosted={isPosted} resetIsPosted={handleResetIsPosted} />
        <CreateThread onPosted={handleOnPosted} />
      </div>
    </div>
  );
};

export default Home;
