import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import axios from 'axios';
import TextArea from './TextArea';

interface FormData {
  title: string;
  post: {
    threadId: number;
    userName: string;
    email: string;
    content: string;
  };
}

interface CreateThreadProps {
  onPosted: () => void;
}

const CreateThread: React.FC<CreateThreadProps> = ({ onPosted }) => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    post: {
      threadId: 0,
      userName: '',
      email: '',
      content: '',
    },
  });

  const url = 'http://127.0.0.1:8000/threads/';

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const sentData = { ...formData };

    if (!sentData.post.userName) {
      sentData.post.userName = '駆け出しエンジニア';
    }

    if (!sentData.post.email) {
      sentData.post.email = 'sage';
    }

    try {
      const response = await axios.post(url, sentData, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('POST response:', response);
    } catch (error) {
      console.error('Error while POST:', error);
    }
    setFormData({
      title: '',
      post: {
        ...formData.post,
        userName: '',
        email: '',
        content: '',
      },
    });
    onPosted();
  };

  return (
    <>
      <div className="sticky bottom-0 h-60"></div>
      <div className="w-full fixed bottom-0">
        <div className="flex flex-col bg-slate-300">
          <div className="flex justify-center">
            <div className="px-4 mt-3 flex flex-col bg-slate-300 w-full md:w-5/6">
              <div className="mx-3 mb-1 text-2xl">新規スレッド作成</div>
              <div className="flex m-1 justify-between items-center">
                <form
                  onSubmit={handleSubmit}
                  className="grow flex flex-col justify-start mb-2 w-full"
                >
                  <div className="flex justify-center">
                    <Input
                      className=""
                      placeholder="駆け出しエンジニア"
                      value={formData.post.userName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          post: { ...formData.post, userName: e.target.value },
                        })
                      }
                    />
                    <Input
                      className="ml-2"
                      placeholder="sage"
                      value={formData.post.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          post: { ...formData.post, email: e.target.value },
                        })
                      }
                    />
                  </div>
                  <Input
                    className=""
                    placeholder="スレッドタイトル(必須)"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title: e.target.value,
                      })
                    }
                  />
                  <TextArea
                    className="h-20"
                    placeholder="本文(必須)"
                    value={formData.post.content}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        post: { ...formData.post, content: e.target.value },
                      })
                    }
                  />
                </form>
                <Button
                  className="flex justify-center items-center w-40 ml-4"
                  onClick={handleSubmit}
                  disabled={!formData.title || !formData.post.content}
                >
                  スレッド作成
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateThread;
