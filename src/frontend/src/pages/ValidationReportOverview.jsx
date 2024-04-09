import '../App.css'
import '../components/ChatBubble.css'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap/'

export default function ValidationReportOverview(trips) {
  return (
    <>
      <table className="table">
        <caption>Reisekostenabrechnung</caption>
        <thead>
          <tr>
            <th scope="col">Datum</th>
            <th scope="col">Antritt</th>
            <th scope="col">Ende</th>
            <th scope="col">Dauer</th>
            <th scope="col">Land/Standort</th>
            <th scope="col">Verpflegungspauschale</th>
            <th scope="col">Kürzungen</th>
            <th scope="col">Flugkosten</th>
            <th scope="col">Bus-/Bahnkosten</th>
            <th scope="col">Taxikosten</th>
            <th scope="col">Kilometergeld</th>
            <th scope="col">Privat Übernachtung</th>
            <th scope="col">Hotel</th>
            <th scope="col">Bewirtung</th>
            <th scope="col">Trinkgeld</th>
            <th scope="col">Sonstiges</th>
            <th scope="col">Summe</th> 
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Summe</th>
            <td>Summe</td>
            <td>Summe</td>
            <td>Summe</td>
            <td>Summe</td>
            <td>Summe</td>
            <td>Summe</td>
            <td>Summe</td>
            <td>Summe</td>
            <td>Summe</td>
            <td>Summe</td>
            <td>Summe</td>
            <td>Summe</td>
            <td>Summe</td>
            <td>Summe</td>
            <td>Summe</td>
            <td>Summe</td>
            <td>Summe</td>
          </tr>
        </tfoot>
      </table>
    </>
  )
}
