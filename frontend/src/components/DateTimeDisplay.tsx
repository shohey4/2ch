import React from 'react';
import { format, parseISO, add } from 'date-fns';
import { ja } from 'date-fns/locale';

interface DateTimeDisplayProps {
  dateTimeString: string;
}

const DateTimeDisplay: React.FC<DateTimeDisplayProps> = ({
  dateTimeString,
}) => {
  // ISO 8601形式の日時文字列をパース
  const parsedDate = parseISO(dateTimeString);

  // 日本時間に変換
  const japanDate = add(parsedDate, { hours: 9 });

  // 期待するフォーマットに日時を変換
  const formattedDate = format(japanDate, 'yyyy/MM/d(E) HH:mm:ss', {
    locale: ja,
  });

  return <div>{formattedDate}</div>;
};

export default DateTimeDisplay;
