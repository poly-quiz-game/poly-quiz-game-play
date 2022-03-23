const SINGLE_CORRECT_ANSWER = "SINGLE_CORRECT_ANSWER";
const MULTIPLE_CORRECT_ANSWER = "MULTIPLE_CORRECT_ANSWER";
const TRUE_FALSE_ANSWER = "TRUE_FALSE_ANSWER";
const TYPE_ANSWER = "TYPE_ANSWER";

export const questionTypes = {
  [SINGLE_CORRECT_ANSWER]: SINGLE_CORRECT_ANSWER,
  [MULTIPLE_CORRECT_ANSWER]: MULTIPLE_CORRECT_ANSWER,
  [TRUE_FALSE_ANSWER]: TRUE_FALSE_ANSWER,
  [TYPE_ANSWER]: TYPE_ANSWER,
};

export const questionTypeLabels = {
  [SINGLE_CORRECT_ANSWER]: "Một đáp án",
  [MULTIPLE_CORRECT_ANSWER]: "Nhiều đáp án",
  [TRUE_FALSE_ANSWER]: "Đúng sai",
  [TYPE_ANSWER]: "Nhập câu trả lời",
};

export const questionTimeLimitOptions = [
  {
    value: 5000,
    label: "5 giây",
  },
  {
    value: 10000,
    label: "10 giây",
  },
  {
    value: 20000,
    label: "20 giây",
  },
  {
    value: 30000,
    label: "30 giây",
  },
  {
    value: 60000,
    label: "1 phút",
  },
  {
    value: 90000,
    label: "1 phút 30 giây",
  },
  {
    value: 120000,
    label: "2 phút",
  },
  {
    value: 180000,
    label: "3 phút",
  },
  {
    value: 300000,
    label: "5 phút",
  },
];
