import React, { useState } from 'react';
import { Modal, Input, Button, message, ConfigProvider } from 'antd';
import { useNavigate } from 'react-router-dom';


const getRandomNumber = () => Math.floor(Math.random() * 20) + 1;

const getOperation = () => {
    const operations = ['+', '-'];
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
    }

    return { num1, num2 };
};

const HumanCheck = () => {
    const [isModalVisible, setIsModalVisible] = useState(true);
    const [userAnswer, setUserAnswer] = useState('');
    const [operation, setOperation] = useState(getOperation());
    const [numbers, setNumbers] = useState(generateNumbers(operation));
    let navigate = useNavigate()

    const calculateAnswer = () => {
        const { num1, num2 } = numbers;
        switch (operation) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
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
        <div className="App w-[full] h-[100%] flex justify-center text-white ">
       
            <div
  className=' h-[38rem] md:h-[20rem] w-[90%] bg-[#18366A] rounded-lg  sm:mt-[30rem] md:mt-[12rem] p-[5rem]'
  
>
  <div className="flex flex-col items-center">
  <p className='text-left font-bold text-[2rem]'>Verify ! Are You Human?</p>
    <div className="mb-4">
    
     <span className='font-bold text-[1.5rem] '>Solve the following expression: </span>  <strong className='font-bold text-[1.6rem] '>{`${numbers.num1} ${operation} ${numbers.num2}`}</strong>
    </div>
    <input
    className='w-1/4 h-12 px-4 text-black rounded-full border-none '
      type="number"
      value={userAnswer}
      onChange={(e) => setUserAnswer(e.target.value)}
     
      placeholder="Your answer"
    />
    <Button className='px-3 mt-4' type="primary" onClick={checkAnswer}>
      Submit
    </Button>
  </div>
</div>


        </div>
    );
};

export default HumanCheck;
