import React, { useState, useEffect } from 'react';
import Question from './Question';
import './Quiz.css';

// Define 50 questions, including placeholders for 45 additional questions
const allQuestions = [
  {
    type: 'yesno',
    question: 'Do you have an emergency fund that can cover at least 3 months of expenses?',
    options: ['Yes', 'No'],
    answer: 'Yes',
  },
  {
    type: 'yesno',
    question: 'Do you save at least 20% of your income each month?',
    options: ['Yes', 'No'],
    answer: 'Yes',
  },
  {
    type: 'mcq',
    question: 'Which of the following is a good practice for financial health?',
    options: ['Investing in stocks', 'Spending beyond your means', 'Ignoring retirement planning', 'None of the above'],
    answer: 'Investing in stocks',
  },
  {
    type: 'mcq',
    question: 'What should you prioritize first in financial planning?',
    options: ['Paying off debt', 'Saving for vacation', 'Buying luxury items', 'Upgrading your car'],
    answer: 'Paying off debt',
  },
  {
    type: 'input',
    question: 'What is your current monthly savings amount?',
    options: [],
    answer: '',
    inputType: 'number',
  },
  {
    type: 'yesno',
    question: 'Do you have an emergency fund that can cover at least 3-6 months of living expenses?',
    options: ['Yes', 'No'],
    answer: 'Yes',
  },
  {
    type: 'yesno',
    question: 'Are you currently debt-free (excluding mortgage or student loans)?',
    options: ['Yes', 'No'],
    answer: 'Yes',
  },
  {
    type: 'yesno',
    question: 'Do you regularly contribute to a retirement savings plan (e.g., 401(k), IRA)?',
    options: ['Yes', 'No'],
    answer: 'Yes',
  },
  {
    type: 'yesno',
    question: 'Do you have a monthly budget that you stick to?',
    options: ['Yes', 'No'],
    answer: 'Yes',
  },
  {
    type: 'yesno',
    question: 'Have you reviewed your credit report in the last 12 months?',
    options: ['Yes', 'No'],
    answer: 'Yes',
  },
  {
    type: 'mcq',
    question: 'What percentage of your income do you save or invest each month?',
    options: ['Less than 5%', '5-10%', '10-20%', 'More than 20%'],
    answer: 'More than 20%',
  },
  {
    type: 'mcq',
    question: 'How would you rate your credit score?',
    options: ['Excellent (750-850)', 'Good (700-749)', 'Fair (650-699)', 'Poor (below 650)'],
    answer: 'Excellent (750-850)',
  },
  {
    type: 'mcq',
    question: 'What is your debt-to-income ratio (total monthly debt payments divided by gross monthly income)?',
    options: ['Less than 20%', '20-35%', '36-50%', 'More than 50%'],
    answer: 'Less than 20%',
  },
  {
    type: 'mcq',
    question: 'How many months\' worth of living expenses do you have saved in your emergency fund?',
    options: ['Less than 1 month', '1-3 months', '3-6 months', 'More than 6 months'],
    answer: 'More than 6 months',
  },
  {
    type: 'mcq',
    question: 'What percentage of your income goes towards housing costs (rent/mortgage, utilities, etc.)?',
    options: ['Less than 20%', '20-30%', '31-40%', 'More than 40%'],
    answer: '20-30%',
  },
  {
    type: 'mcq',
    question: 'Which of the following best describes your retirement savings strategy?',
    options: ['I don’t have a retirement savings plan', 'I save sporadically when I can', 'I have a regular savings plan but no set target', 'I have a well-defined plan with a target goal'],
    answer: 'I have a well-defined plan with a target goal',
  },
  {
    type: 'mcq',
    question: 'How often do you review and adjust your financial goals?',
    options: ['Never', 'Once a year', 'Every 6 months', 'Quarterly or more frequently'],
    answer: 'Quarterly or more frequently',
  },
  {
    type: 'input',
    question: 'What is your current monthly income (after taxes)?',
    options: [],
    answer: '',
    inputType: 'number',
  },
  {
    type: 'input',
    question: 'What is your total outstanding debt (excluding mortgage)?',
    options: [],
    answer: '',
    inputType: 'number',
  },
  {
    type: 'input',
    question: 'How much do you have saved for retirement?',
    options: [],
    answer: '',
    inputType: 'number',
  },
  {
    type: 'input',
    question: 'What is the total value of your liquid assets (cash, savings accounts, etc.)?',
    options: [],
    answer: '',
    inputType: 'number',
  },
  {
    type: 'input',
    question: 'How much do you spend on discretionary expenses (entertainment, dining out, etc.) per month?',
    options: [],
    answer: '',
    inputType: 'number',
  },
  {
    type: 'input',
    question: 'How much do you pay in interest on your debt per month?',
    options: [],
    answer: '',
    inputType: 'number',
  },
  {
    type: 'input',
    question: 'What is your current net worth (total assets minus total liabilities)?',
    options: [],
    answer: '',
    inputType: 'number',
  },
  {
    type: 'input',
    question: 'What percentage of your income is automatically transferred to savings or investments each month?',
    options: [],
    answer: '',
    inputType: 'number',
  },
  {
    type: 'yesno',
    question: 'Do you have any form of insurance (health, life, auto)?',
    options: ['Yes', 'No'],
    answer: 'Yes',
  },
  {
    type: 'yesno',
    question: 'Do you regularly review and update your will or estate plan?',
    options: ['Yes', 'No'],
    answer: 'Yes',
  },
  {
    type: 'yesno',
    question: 'Do you set financial goals for yourself each year?',
    options: ['Yes', 'No'],
    answer: 'Yes',
  },
  {
    type: 'yesno',
    question: 'Are you on track to pay off all your debts within the next 5 years?',
    options: ['Yes', 'No'],
    answer: 'Yes',
  },
  {
    type: 'yesno',
    question: 'Do you have a side income or additional sources of income?',
    options: ['Yes', 'No'],
    answer: 'Yes',
  },
  {
    type: 'mcq',
    question: 'How often do you track your spending?',
    options: ['Daily', 'Weekly', 'Monthly', 'Rarely/Never'],
    answer: 'Daily',
  },
  {
    type: 'mcq',
    question: 'How do you primarily manage your finances?',
    options: ['Using a budget app', 'Using a spreadsheet', 'Tracking mentally', 'Not managing actively'],
    answer: 'Using a budget app',
  },
  {
    type: 'mcq',
    question: 'What is your primary financial goal?',
    options: ['Paying off debt', 'Saving for retirement', 'Buying a house', 'Building an emergency fund'],
    answer: 'Saving for retirement',
  },
  {
    type: 'mcq',
    question: 'Which of the following best describes your investment strategy?',
    options: ['Conservative', 'Moderate', 'Aggressive', 'I don’t invest'],
    answer: 'Moderate',
  },
  {
    type: 'mcq',
    question: 'What percentage of your income goes towards discretionary spending?',
    options: ['Less than 10%', '10-20%', '21-30%', 'More than 30%'],
    answer: '10-20%',
  },
  {
    type: 'mcq',
    question: 'How many credit cards do you currently use?',
    options: ['None', '1-2', '3-4', 'More than 4'],
    answer: '1-2',
  },
  {
    type: 'mcq',
    question: 'What is your primary reason for saving money?',
    options: ['Emergency fund', 'Large purchase', 'Vacation', 'Investing'],
    answer: 'Emergency fund',
  },
  {
    type: 'mcq',
    question: 'How confident are you in your ability to handle a financial emergency?',
    options: ['Very confident', 'Somewhat confident', 'Not confident', 'Not sure'],
    answer: 'Very confident',
  },
  {
    type: 'mcq',
    question: 'Which of the following best describes your attitude towards debt?',
    options: ['I avoid it completely', 'I manage it carefully', 'I use it when necessary', 'I don’t worry about it'],
    answer: 'I manage it carefully',
  },
  {
    type: 'mcq',
    question: 'What is the largest portion of your monthly expenses?',
    options: ['Housing', 'Transportation', 'Food', 'Debt repayment'],
    answer: 'Housing',
  },
  {
    type: 'mcq',
    question: 'How often do you check your bank account balance?',
    options: ['Daily', 'Weekly', 'Monthly', 'Rarely/Never'],
    answer: 'Weekly',
  },
  {
    type: 'mcq',
    question: 'What is your plan for paying off your credit card balance each month?',
    options: ['Pay in full', 'Pay the minimum', 'Pay more than the minimum', 'Carry a balance'],
    answer: 'Pay in full',
  },
  {
    type: 'mcq',
    question: 'How do you prioritize your financial obligations each month?',
    options: ['Bills first, then savings', 'Savings first, then bills', 'Discretionary spending first', 'I don’t have a plan'],
    answer: 'Bills first, then savings',
  },
  {
    type: 'input',
    question: 'How many different types of accounts do you have (e.g., savings, checking, investment)?',
    options: [],
    answer: '',
    inputType: 'number',
  },
  {
    type: 'input',
    question: 'What is your average monthly credit card balance?',
    options: [],
    answer: '',
    inputType: 'number',
  },
    
  {
    type: 'mcq',
    question: 'What is your preferred method for saving money?',
    options: ['Automatic transfer', 'Manual deposit', 'Cash savings', 'I don’t save regularly'],
    answer: 'Automatic transfer',
  },
  {
    type: 'mcq',
    question: 'Which of the following best describes your approach to budgeting?',
    options: ['Strict budget', 'Flexible budget', 'No budget', 'Occasional tracking'],
    answer: 'Flexible budget',
  },
  {
    type: 'mcq',
    question: 'How do you handle unexpected expenses?',
    options: ['Use savings', 'Use credit card', 'Borrow from friends/family', 'Delay payment'],
    answer: 'Use savings',
  },
  {
    type: 'mcq',
    question: 'What is your primary financial concern?',
    options: ['Not saving enough', 'High debt', 'Unstable income', 'Lack of investments'],
    answer: 'Not saving enough',
  },
  {
    type: 'mcq',
    question: 'How often do you contribute to your retirement fund?',
    options: ['Monthly', 'Quarterly', 'Annually', 'Not at all'],
    answer: 'Monthly',
  },
  {
    type: 'mcq',
    question: 'What is your strategy for paying off student loans?',
    options: ['Pay the minimum', 'Pay extra each month', 'Defer payments', 'Not applicable'],
    answer: 'Pay extra each month',
  },
  {
    type: 'mcq',
    question: 'What is your approach to investing?',
    options: ['Long-term growth', 'Short-term gains', 'No investments', 'Not sure'],
    answer: 'Long-term growth',
  },
  {
    type: 'mcq',
    question: 'How do you handle credit card rewards?',
    options: ['Maximize them', 'Occasionally use them', 'Ignore them', 'I don’t use credit cards'],
    answer: 'Maximize them',
  },
  {
    type: 'mcq',
    question: 'What percentage of your income is allocated to retirement savings?',
    options: ['Less than 5%', '5-10%', '10-15%', 'More than 15%'],
    answer: 'More than 15%',
  },
  {
    type: 'mcq',
    question: 'How do you typically pay for large purchases?',
    options: ['Cash', 'Credit card', 'Financing', 'Installment plan'],
    answer: 'Cash',
  },
  {
    type: 'mcq',
    question: 'What is your approach to managing financial risk?',
    options: ['Insurance coverage', 'Emergency fund', 'Diversified investments', 'No specific plan'],
    answer: 'Diversified investments',
  },
  {
    type: 'mcq',
    question: 'What is your most significant financial goal in the next 5 years?',
    options: ['Buying a home', 'Paying off debt', 'Building wealth', 'Traveling'],
    answer: 'Building wealth',
  },
  {
    type: 'mcq',
    question: 'How do you feel about your current level of savings?',
    options: ['Very comfortable', 'Comfortable', 'Uncomfortable', 'Very uncomfortable'],
    answer: 'Comfortable',
  },
  {
    type: 'mcq',
    question: 'What do you prioritize when managing monthly bills?',
    options: ['Pay on time', 'Pay in full', 'Pay minimum required', 'Delay payment'],
    answer: 'Pay on time',
  },
  {
    type: 'mcq',
    question: 'How often do you update your financial plan?',
    options: ['Quarterly', 'Annually', 'As needed', 'Never'],
    answer: 'Annually',
  },
  {
    type: 'mcq',
    question: 'What is your strategy for handling rising living costs?',
    options: ['Cutting expenses', 'Increasing income', 'Using savings', 'No strategy'],
    answer: 'Cutting expenses',
  },
  {
    type: 'mcq',
    question: 'How much do you contribute to your health savings account (HSA) each year?',
    options: ['Maximum allowed', 'Partial contribution', 'Minimal contribution', 'I don’t have an HSA'],
    answer: 'Maximum allowed',
  },
  {
    type: 'mcq',
    question: 'What is your plan for managing taxes on investments?',
    options: ['Tax-efficient investments', 'Pay as needed', 'Ignore taxes', 'I don’t invest'],
    answer: 'Tax-efficient investments',
  },
  {
    type: 'mcq',
    question: 'How do you ensure you meet your financial goals?',
    options: ['Regularly reviewing progress', 'Setting reminders', 'Working with a financial advisor', 'No specific plan'],
    answer: 'Regularly reviewing progress',
  },
  {
    type: 'mcq',
    question: 'What is your preferred method for paying off debt?',
    options: ['Snowball method', 'Avalanche method', 'Minimum payments', 'No specific method'],
    answer: 'Avalanche method',
  },
  {
    type: 'mcq',
    question: 'How often do you diversify your investment portfolio?',
    options: ['Regularly', 'Occasionally', 'Rarely', 'Never'],
    answer: 'Regularly',
  },
  {
    type: 'mcq',
    question: 'What is your strategy for saving for a down payment on a house?',
    options: ['Set aside a fixed amount monthly', 'Save any extra money', 'Rely on bonuses/tax returns', 'I’m not saving for a house'],
    answer: 'Set aside a fixed amount monthly',
  },
  {
    type: 'mcq',
    question: 'How do you protect your financial information?',
    options: ['Using secure passwords', 'Monitoring accounts regularly', 'Avoiding public Wi-Fi for transactions', 'All of the above'],
    answer: 'All of the above',
  },
  {
    type: 'mcq',
    question: 'What is your primary source of financial advice?',
    options: ['Financial advisor', 'Online resources', 'Friends/family', 'I don’t seek financial advice'],
    answer: 'Financial advisor',
  },
  {
    type: 'mcq',
    question: 'How do you prepare for retirement?',
    options: ['Regularly contributing to retirement accounts', 'Planning to downsize', 'Relying on social security', 'No specific plan'],
    answer: 'Regularly contributing to retirement accounts',
  },
  
];


const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
};

const Quiz = ({ onComplete }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [inputSubmitted, setInputSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    const getQuestionsInBatches = () => {
      const shuffledQuestions = shuffleArray([...allQuestions]);
      const selectedQuestions = shuffledQuestions.slice(0, 5);
      setQuestions(selectedQuestions);
      setLoading(false);
    };

    getQuestionsInBatches();
  }, []);

  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion.type === 'input') {
      if (userInput === '') {
        setInputError('Please provide an answer.');
        return;
      }
      if (userInput === currentQuestion.answer) {
        setScore(score + 1);
      }
    } else {
      if (answer === currentQuestion.answer) {
        setScore(score + 1);
      }
    }

    setInputSubmitted(true);
    setTimeout(() => {
      setInputSubmitted(false);
      setUserInput('');
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }, 1000);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (currentQuestionIndex >= questions.length) {
    onComplete(score);
    return <div>Quiz Completed. Your score is: {score}</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz">
      <Question
        question={currentQuestion.question}
        options={currentQuestion.options}
        inputType={currentQuestion.inputType}
        userInput={userInput}
        setUserInput={setUserInput}
        onAnswer={handleAnswer} // Ensure this is correctly passed
        inputError={inputError}
        inputSubmitted={inputSubmitted}
      />
    </div>
  );
};

export default Quiz;