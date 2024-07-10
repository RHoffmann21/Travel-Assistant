import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import util from '../utils/util';

import ChatBox from '../components/ChatBox';
import CommentModal from '../components/CommentModal';

export default function Chat() {
  const { travelExpenseReportId } = useParams();
  const [travelExpenseReport, setTravelExpenseReport] = useState();
  const [nextQuestion, setNextQuestion] = useState();
  const [chat, setChat] = useState([]);
  const [values, setValues] = useState([]);
  const [showCommentModal, setShowCommentModal] = useState(true);

  useEffect(() => {
    getTravelExpenseReport();
  }, []);

  async function getTravelExpenseReport() {
    try {
      const response = await axios.get(`/api/v1/travelExpenseReports/${travelExpenseReportId}`);
      if (response.status === 200) {
        setTravelExpenseReport(response.data);
        if (response.data.travelReports[0]?.chat?.length) {
          setChat(response.data.travelReports[0].chat)
        }
      } else {
        console.error('Error getting travel expense report');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  }

  async function getFirstQuestion() {
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

  async function getNextQuestion() {
    try {
      const response = await axios.post(`/api/v1/travelExpenseReports/${travelExpenseReportId}/chat`, chat);

      if (response.status === 200) {
        const { question, nextAnswerValues } = response.data;
        setValues(nextAnswerValues);
        setNextQuestion(question);
      } else {
        console.error('Error getting travel expense report');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  }

  async function deleteTravelExpenseReport() {
    try {
      await axios.delete(`/api/v1/travelExpenseReports/${travelExpenseReportId}`);
      window.location.href = '/travelExpenseReports';
    } catch (error) {
      console.error('Network error:', error);
    }
  }

  async function checkTravelExpenseReport() {
    try {
      await axios.post(`/api/v1/travelExpenseReports/${travelExpenseReportId}/convert`);
      window.location.href = '/travelExpenseReports';
    } catch (error) {
      console.error('Network error:', error);
    }
  }

  useEffect(() => {
    if (travelExpenseReport && travelExpenseReport.travelReports[0].chat.length === 0) {
      getFirstQuestion();
    }
  }, [travelExpenseReport]);

  useEffect(() => {
    if (chat?.length) {
      getNextQuestion();
    }
  }, [chat]);

  return (
    <>
      <div>
        
        <div className="d-flex justify-content-between py-2">
          <button type="button" onClick={deleteTravelExpenseReport} className="btn btn-danger">Löschen</button>
          <h3>{travelExpenseReport && util.getMonth(travelExpenseReport?.month)} {travelExpenseReport?.year}</h3>
          <button type="button" onClick={checkTravelExpenseReport} className="btn btn-primary">Freigeben</button>
        </div>
      </div>
      {
        (nextQuestion) && <ChatBox chat={chat} setChat={setChat} nextQuestion={nextQuestion} setNextQuestion={setNextQuestion} values={values} travelExpenseReport={travelExpenseReport} />
      }
      {
        travelExpenseReport?.comment && <CommentModal show={showCommentModal} onHide={() => setShowCommentModal(false)} comment={travelExpenseReport.comment} />
      }
    </>
  )
}