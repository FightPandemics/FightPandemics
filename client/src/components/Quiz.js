import React from 'react';
import PropTypes from 'prop-types';
import Question from '../components/Question';
import QuestionCount from '../components/QuestionCount';
import AnswerOption from '../components/AnswerOption';

function Quiz(props) {
    return (
        <div className="quiz">
          <QuestionCount
            counter={props.questionId}
            total={props.questionTotal}
          />
          <Question content={props.question} />
          <ul className="answerOptions">
            {props.answerOptions.map(renderAnswerOptions)}
          </ul>
        </div>
    );
  }
  
  Quiz.propTypes = {
    answer: PropTypes.string.isRequired,
    answerOptions: PropTypes.array.isRequired,
    counter: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    questionId: PropTypes.number.isRequired,
    questionTotal: PropTypes.number.isRequired,
    onAnswerSelected: PropTypes.func.isRequired
  };
  
  export default Quiz;