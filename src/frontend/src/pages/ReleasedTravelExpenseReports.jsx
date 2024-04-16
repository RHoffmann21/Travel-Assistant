import AuditValidateCard from '../components/AuditValidateCard';
import axios from 'axios';
import { useState,useEffect } from 'react';
import Card from 'react-bootstrap/Card';

export default function TravelReportsOverview({type}) {
  const [travelExpenseReports, setTravelExpenseReports] = useState();

  useEffect(() => {
    axios.get(`/api/v1/travelExpenseReports/${type}`)
      .then((res) => {
        setTravelExpenseReports(res.data);
      })
  }, []);

  return (
    <>
      {
        travelExpenseReports?.map(travelExpenseReport => (
          <AuditValidateCard key={travelExpenseReport._id} travelExpenseReport={travelExpenseReport} type={type}></AuditValidateCard>
        ))
      }
      {!travelExpenseReports || !travelExpenseReports?.length &&
      <Card>
        <Card.Body>
          <Card.Title className="my-1">
            Keine Reisekostenabrechnung zur {type==='validate'? 'validierung': 'überprüfung'} gefunden! 
          </Card.Title>
        </Card.Body>
      </Card>
      }
    </>
  )
}
