import Card from 'react-bootstrap/Card';

function ReportCard({travelReport}) {
  return (
    <Card className="mx-3 my-1">
      <Card.Body>
        <Card.Title>
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-2">
									{getStatusIcon(travelReport.status)}
							</div>
							<div className="col-8">
								{travelReport.month} {travelReport.year} 
							</div>
							<div className="col-2">
								<a href={`/#${travelReport.travelReportId}`} className="stretched-link"><i className="bi bi-caret-right"></i></a>
							</div>
						</div>
					</div>
				</Card.Title>
      </Card.Body>
    </Card>
  );
}

function getStatusIcon(status) {
	switch (status) {
		case 'pending':
			return (<i className="bi bi-three-dots"></i>);
		case 'inReview':
			return (<i style={{color: "blue"}} className="bi bi-file-earmark-break"></i>);
		case 'toBeCorrected':
			return (<i style={{color: "red"}} className="bi bi-exclamation-diamond-fill"></i>);
		case 'finished':
			return (<i style={{color: "green"}} className="bi bi-check-lg success"></i>);
	}
}

export default ReportCard;