import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import util from '../utils/util';


export default function AuditValidateCard({ travelExpenseReport, type }) {
	return (
		<>
			<Card className="mx-3 my-1">
				<Card.Body>
					<Card.Title className="my-1">
						<div className="container">
							<div className="row justify-content-center">
                <div className="col-6">
									{travelExpenseReport.user.userFirstName.concat(' ', travelExpenseReport.user.userName)}
								</div>
								<div className="col-4">
									{util.getMonth(travelExpenseReport.month)} {travelExpenseReport.year}
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
