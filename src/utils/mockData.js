export const recentQueries = [
  {
    id: 1,
    topic: 'Exam schedule confusion',
    question: 'When does the semester 5 practical exam window open?',
    time: 'Today, 09:20 AM',
  },
  {
    id: 2,
    topic: 'Fee payment',
    question: 'Can I pay my pending lab fee in two installments?',
    time: 'Yesterday, 05:40 PM',
  },
  {
    id: 3,
    topic: 'Attendance',
    question: 'What is the minimum attendance needed for internal marks?',
    time: 'Yesterday, 11:10 AM',
  },
]

export const suggestedQuestions = [
  'Can you summarize this week\'s timetable changes?',
  'What documents are needed for scholarship renewal?',
  'How do I request a revaluation for one subject?',
  'When does hostel fee payment close this month?',
]

export const dashboardStats = [
  {
    id: 'resolved',
    label: 'Resolved this month',
    value: '14',
    hint: '+3 from last month',
  },
  {
    id: 'avg-time',
    label: 'Average response time',
    value: '28 sec',
    hint: 'Fast turnaround',
  },
  {
    id: 'satisfaction',
    label: 'Your support score',
    value: '4.8/5',
    hint: 'Based on recent chats',
  },
]

export const quickActions = [
  {
    id: 'fees',
    title: 'Fee Payment Guide',
    caption: 'Understand due dates and installment options',
  },
  {
    id: 'attendance',
    title: 'Attendance Rules',
    caption: 'Check minimum criteria and shortage policies',
  },
  {
    id: 'scholarship',
    title: 'Scholarship Checklist',
    caption: 'Get document and eligibility requirements',
  },
]

export const chatQuickPrompts = [
  'What should I do if I miss an exam due to illness?',
  'Explain hostel fee breakup for this semester.',
  'How can I apply for a bonafide certificate?',
]

export const notifications = [
  {
    id: 1,
    title: 'Midterm schedule released',
    message: 'The updated midterm timetable is now available in the exam portal.',
    timestamp: '10 min ago',
  },
  {
    id: 2,
    title: 'Fee reminder',
    message: 'Your library renewal fee is due by March 26.',
    timestamp: '1 hour ago',
  },
  {
    id: 3,
    title: 'Workshop seats open',
    message: 'New seats were added for the resume-building workshop.',
    timestamp: 'Yesterday',
  },
]

const AI_REPLY_MAP = [
  {
    keywords: ['fee', 'payment', 'installment', 'hostel'],
    response:
      'For fee-related help, open the Finance Portal, check outstanding dues, and use Installment Request if available. If the button is missing, you can submit a manual request to Accounts with your student ID and reason.',
  },
  {
    keywords: ['attendance', 'internal', 'shortage'],
    response:
      'Attendance rules are usually tracked subject-wise. If you are close to shortage, contact your class advisor early and keep medical or event documents ready to support your case.',
  },
  {
    keywords: ['exam', 'clash', 'revaluation', 'midterm'],
    response:
      'For exam support, first verify your schedule in the portal, then raise a ticket under Examination Services. If this is about revaluation, apply within the announced window and keep your payment receipt.',
  },
  {
    keywords: ['scholarship', 'document', 'renewal'],
    response:
      'Scholarship renewals usually need mark sheets, fee receipt, and bank details. I can list the exact order to upload documents so your form is less likely to be rejected.',
  },
]

export function generateAiResponse(prompt) {
  const normalizedPrompt = prompt.toLowerCase()
  const matchedRule = AI_REPLY_MAP.find((rule) =>
    rule.keywords.some((keyword) => normalizedPrompt.includes(keyword)),
  )

  if (matchedRule) {
    return `${matchedRule.response} If you want, I can also convert this into a step-by-step checklist for today.`
  }

  return 'Thanks for sharing that. I can help you with the next best step, required documents, and who to contact on campus. Tell me what part feels most confusing and I will simplify it.'
}
