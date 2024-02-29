import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import axios from 'axios';
import TextArea from './TextArea';
import { useParams } from 'react-router-dom';

interface FormData {
  threadId: string | undefined;
  userName: string;
  email: string;
  content: string;
}

interface CreatePostProps {
  onPost: () => void;
  isClosed?: boolean;
}

const CreateThread: React.FC<CreatePostProps> = ({ onPost, isClosed }) => {
  const { id } = useParams<{ id: string }>();

  // const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    threadId: id,
    userName: '',
    email: '',
    content: '',
  });

  const url = 'http://127.0.0.1:8000/threads/';

  // useEffect(() => {
  //   if (isSubmitting) {
  //     console.log('isSubmitting:', isSubmitting);
  //   }
  // }, [isSubmitting]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const sentData = { ...formData };

    if (!sentData.userName) {
      sentData.userName = '駆け出しエンジニア';
    }

    if (!sentData.email) {
      sentData.email = 'sage';
    }

    // try catchで POST リクエストを送信

    try {
      const response = await axios.post(url + id + '/posts/', sentData, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('POST response:', response);
    } catch (error) {
      console.error('Error while POST:', error);
    }
    setFormData({
      threadId: id,
      userName: '',
      email: '',
      content: '',
    });
    onPost();
  };

  return (
    // <div className="w-full px-2 bg-slate-200 flex h-56 absolute left-0 right-0 bottom-0 justify-between items-center">
    <>
      <div className="sticky bottom-0 h-52"></div>
      <div className="w-full fixed bottom-0">
        <div className="flex flex-col bg-slate-300">
          <div className="flex justify-center">
            <div className="px-4 mt-2 flex flex-col bg-slate-300 w-full md:w-5/6">
              {isClosed ? (
                <div className="mx-3 text-xl">スレッドは終了しました</div>
              ) : (
                <>
                  <div className="mx-3 mb-1 text-xl">新規書き込み</div>
                  <div className="flex justify-between items-center">
                    <form className="grow flex flex-col justify-start mb-2 w-full">
                      <div className="flex justify-between">
                        <Input
                          placeholder="駆け出しエンジニア"
                          value={formData.userName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              userName: e.target.value,
                            })
                          }
                        />
                        <Input
                          placeholder="sage"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                      <TextArea
                        className="h-20"
                        placeholder="本文(必須)"
                        value={formData.content}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            content: e.target.value,
                          })
                        }
                      />
                    </form>
                    <Button
                      className="flex justify-center w-32 ml-4"
                      onClick={handleSubmit}
                      disabled={!formData.content}
                    >
                      書き込む
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateThread;
