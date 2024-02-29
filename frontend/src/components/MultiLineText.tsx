import React from 'react';

interface MultiLineTextProps {
  body: string;
}

const MultiLineText: React.FC<MultiLineTextProps> = ({ body }) => {
  const texts = body.split('\n').map((item, index) => {
    return (
      <React.Fragment key={index}>
        {item}
        <br />
      </React.Fragment>
    );
  });
  return <div>{texts}</div>;
};

export default MultiLineText;
