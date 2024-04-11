import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import ChatBox from '../components/ChatBox';



export default function Chat() {
  const { travelExpenseReportId } = useParams();
  const [ travelExpenseReport, setTravelExpenseReport ] = useState();
  const [ nextQuestion, setNextQuestion ] = useState();
  const [ chat, setChat ] = useState({});

  // useEffect(() => {

  // })[nextQuestion];

  useEffect(() => {
    axios.get(`/api/v1/travelExpenseReports/${travelExpenseReportId}`)
      .then((res) => {
        setTravelExpenseReport(res.data);
      })
  }, []);

  async function getFirstQuestion(){
    try {
      const response = await axios.get('/api/v1/travelExpenseReports/questions/firstQuestion');
      if (response.status === 200) {
        setNextQuestion(response.data);
      } else {
        console.error('Error getting travel expense report');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  }

  useEffect(() => {
    if(typeof (travelExpenseReport?.travelReport) === 'undefined' ||
    typeof (travelExpenseReport?.travelReport?.chat) === 'undefined'){
      getFirstQuestion()
    }
  },[travelExpenseReport])

  return(
  <>
    {
      (chat && nextQuestion) && <ChatBox chat={chat} setChat={setChat} nextQuestion={nextQuestion} setNextQuestion={setNextQuestion} />
    }
    { travelExpenseReport && JSON.stringify(travelExpenseReport)}
    { nextQuestion && JSON.stringify(nextQuestion)}
  </>
  )
}