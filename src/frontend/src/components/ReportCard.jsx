import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import util from '../utils/util';


function ReportCard({ travelExpenseReport }) {
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
								<div className="col-6">
									{util.getMonth(travelExpenseReport.month)} {travelExpenseReport.year}
								</div>
								<div className="col-2">
									{
										(typeof (travelExpenseReport.status) === 'undefined' || travelExpenseReport.status === 'needsEditing') && <Link to={`${travelExpenseReport._id}`} className="stretched-link"><i className="bi bi-caret-right"></i></Link>
									}
								</div>
							</div>
						</div>
					</Card.Title>
				</Card.Body>
			</Card>
		</>
	);
}'pending', 'verified', 'accepted', 'declined', 'needsEditing'

function getStatusIcon(status) {
	switch (status) {
		case 'pending':
			return (<i className="bi bi-file-earmark-break"></i>);
		case 'verified':
			return (<i style={{ color: "blue" }} className="bi bi-check2"></i>);
		case 'needsEditing':
			return (<i style={{ color: "orange" }} className="bi bi-exclamation-diamond-fill"></i>);
		case 'accepted':
			return (<i style={{ color: "green" }} className="bi bi-check2-all"></i>);
		case 'declined':
			return (<i style={{ color: "red" }} className="bi bi-ban"></i>);
		default:
			return (<i className="bi bi-three-dots"></i>);
	}
}

export default ReportCard;