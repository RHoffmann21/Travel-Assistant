import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


function ReportCard({ travelExpenseReport }) {
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
								<div className="col-2">
									{getStatusIcon(travelExpenseReport.status)}
								</div>
								<div className="col-8">
									{monatsNamen[travelExpenseReport.month]} {travelExpenseReport.year}
								</div>
								<div className="col-2">
									<Link to={`${travelExpenseReport._id}`} className="stretched-link"><i className="bi bi-caret-right"></i></Link>
								</div>
							</div>
						</div>
					</Card.Title>
				</Card.Body>
			</Card>
		</>
	);
}

function getStatusIcon(status) {
	switch (status) {
		case 'pending':
			return (<i className="bi bi-three-dots"></i>);
		case 'inReview':
			return (<i style={{ color: "blue" }} className="bi bi-file-earmark-break"></i>);
		case 'toBeCorrected':
			return (<i style={{ color: "red" }} className="bi bi-exclamation-diamond-fill"></i>);
		case 'finished':
			return (<i style={{ color: "green" }} className="bi bi-check-lg success"></i>);
	}
}

export default ReportCard;