import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({}) {
  const baseUrl = '  http://localhost:4000/questions'

  const [question, setQuestions] = useState([])


useEffect(()=> {
  const fetchQuestions = async () => {
    try{
      const response = await fetch(baseUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
        
        
      }
      const data = await response.json()
      setQuestions(data)
      console.log(data)
      
    }catch (error) {
      console.error('fetch error:', error);
      
    }
  }
  fetchQuestions()

},[])

const handleDeleteQuestion = (id) => {
  fetch(`${baseUrl}/${id}`,{
    method: 'DELETE'
  })
  .then(response =>{
    if (!response.ok) {
      throw new Error("Network response was not ok");
      
      
    }
    setQuestions(prevQuestions => prevQuestions.filter(question => question.id !== id))
  })
  .catch(error => console.error('Delete error', error)
  )
}

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
        {question.map(question => (
          <QuestionItem 
          key={question.id}
          question={question}
          onDeleteQuestion={handleDeleteQuestion}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
