import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ChatBubble from './ChatBubble';
import { Link } from 'react-router-dom';


function ReportCard({ travelReport }) {

	const [openChat, setOpenChat] = useState(false)
	function handleOnClick() {
		setOpenChat(true);
	}

	useEffect(() => {
		console.log('chat opened: ', openChat)
	}, [openChat]);

	return (
		<>
			<Card className="mx-3 my-1">
				<Card.Body>
					<Card.Title className="my-1">
						<div className="container">
							<div className="row justify-content-center">
								<div className="col-2">
									{getStatusIcon(travelReport.status)}
								</div>
								<div className="col-8">
									{travelReport.month} {travelReport.year}
								</div>
								<div className="col-2">
									<Link to={`${travelReport.travelReportId}`} className="stretched-link" onClick={handleOnClick}><i className="bi bi-caret-right"></i></Link>
								</div>
							</div>
						</div>
					</Card.Title>
				</Card.Body>
			</Card>
			{
				openChat ? <ChatBubble side="question" type="text" content="kdjsksdjki" /> : null
			}
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