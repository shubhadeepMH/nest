import React, { useState } from 'react';
import { Modal, Input, Button ,message} from 'antd';
import { useNavigate } from 'react-router-dom';


const getRandomNumber = () => Math.floor(Math.random() * 30) + 1;

const getOperation = () => {
  const operations = ['+', '-', '*', '/'];
  return operations[Math.floor(Math.random() * operations.length)];
};

const generateNumbers = (operation) => {
  let num1 = getRandomNumber();
  let num2 = getRandomNumber();
  

  if (operation === '-') {
    // Ensure num1 is always greater than or equal to num2 for subtraction
    if (num1 < num2) {
      [num1, num2] = [num2, num1]; // Swap to ensure num1 is greater
    }
  } else if (operation === '/') {
    // Ensure num1 is divisible by num2 for division
    while (num1 % num2 !== 0) {
      num1 = getRandomNumber();
      num2 = getRandomNumber();
    }
  }

  return { num1, num2 };
};
       
const HumanCheck = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [userAnswer, setUserAnswer] = useState('');
  const [operation, setOperation] = useState(getOperation());
  const [numbers, setNumbers] = useState(generateNumbers(operation));
  let navigate=useNavigate()

  const calculateAnswer = () => {
    const { num1, num2 } = numbers;
    switch (operation) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case '*':
        return num1 * num2;
      case '/':
        return num1 / num2;
      default:
        return 0;
    }
  };

  const checkAnswer = () => {
    if (parseFloat(userAnswer) === calculateAnswer()) {
 
      navigate('/home', { replace: true })
    } else {
      message.error("Please Verify Yourself")
    }
    // Generate new question
    const newOperation = getOperation();
    const newNumbers = generateNumbers(newOperation);
    setOperation(newOperation);
    setNumbers(newNumbers);
    setUserAnswer('');
  };

  return (
    <div className="App">
      <Modal title="Are you a human?" visible={isModalVisible} footer={null} onCancel={() => setIsModalVisible(false)}>
        <div className="flex flex-col items-center">
          <div className="mb-4">
            Solve the following expression: <strong>{`${numbers.num1} ${operation} ${numbers.num2}`}</strong>
          </div>
          <Input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="mb-4"
            placeholder="Your answer"
          />
          <Button type="primary" onClick={checkAnswer}>
            Submit
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default HumanCheck;
