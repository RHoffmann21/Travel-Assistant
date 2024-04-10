import { Calendar } from "react-multi-date-picker";

export default function Beispiel() {
  return(
    <Calendar
    onlyMonthPicker
    format="MMMM YYYY"
    highlightToday={false}
    type='icon'
    />
  )
}