import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


export default function AuditValidateCard({ travelExpenseReport, type }) {
	const monatsNamen = [
		"Januar", "Februar", "März", "April", "Mai", "Juni",
		"Juli", "August", "September", "Oktober", "November", "Dezember"
  ];

	return (
		<>
			<Card className="mx-3 my-1">
				<Card.Body>
					<Card.Title className="my-1">
						<div className="container">
							<div className="row justify-content-center">
                <div className="col-6">
									{travelExpenseReport.user.fullName}
								</div>
								<div className="col-4">
									{monatsNamen[travelExpenseReport.month]} {travelExpenseReport.year}
								</div>
								<div className="col-2">
									<Link to={`/travelExpenseReports/${travelExpenseReport._id}/${type}`} className="stretched-link"><i className="bi bi-caret-right"></i></Link>
								</div>
							</div>
						</div>
					</Card.Title>
				</Card.Body>
			</Card>
		</>
	);
}
