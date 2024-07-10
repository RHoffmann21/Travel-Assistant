
function getMonth(monthIndex) {
  const monthArray = [
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember"
  ];
  return monthArray[monthIndex] 
}

export default { getMonth };