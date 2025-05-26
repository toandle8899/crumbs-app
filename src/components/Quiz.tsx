import React, { useState } from 'react';
import { XIcon } from 'lucide-react';
import { Button } from './common/Button';
interface QuizProps {
  onClose: () => void;
}
export function Quiz({
  onClose
}: QuizProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const mockQuestion = {
    question: "According to Piaget's theory, during which stage do children develop abstract reasoning?",
    options: ['Sensorimotor stage', 'Preoperational stage', 'Concrete operational stage', 'Formal operational stage'],
    correctAnswer: 'Formal operational stage'
  };
  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };
  const handleSubmit = () => {
    setIsAnswered(true);
  };
  const handleContinue = () => {
    onClose();
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white w-11/12 max-w-md rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Quick Check</h3>
          <button className="p-1 rounded-full hover:bg-gray-100" onClick={onClose}>
            <XIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="mb-6">
          <p className="text-gray-800 font-medium mb-4">
            {mockQuestion.question}
          </p>
          <div className="space-y-3">
            {mockQuestion.options.map((option, index) => <button key={index} className={`w-full text-left p-3 rounded-lg border ${selectedAnswer === option ? isAnswered ? option === mockQuestion.correctAnswer ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500' : 'bg-purple-50 border-purple-500' : isAnswered && option === mockQuestion.correctAnswer ? 'bg-green-50 border-green-500' : 'border-gray-200 hover:bg-gray-50'}`} onClick={() => !isAnswered && handleAnswerSelect(option)} disabled={isAnswered}>
                <span className="text-sm font-medium">{option}</span>
              </button>)}
          </div>
        </div>
        {!isAnswered ? <Button onClick={handleSubmit} disabled={!selectedAnswer} className="w-full">
            Check Answer
          </Button> : <div>
            {selectedAnswer === mockQuestion.correctAnswer ? <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-sm font-medium">
                  Correct! Great job.
                </p>
              </div> : <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm font-medium">
                  Not quite. The correct answer is "{mockQuestion.correctAnswer}
                  ".
                </p>
              </div>}
            <Button onClick={handleContinue} className="w-full">
              Continue Learning
            </Button>
          </div>}
      </div>
    </div>;
}