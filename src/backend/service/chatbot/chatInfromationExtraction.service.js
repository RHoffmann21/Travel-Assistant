async function extractInformationOutOfChat(trip) {
  const { chat } = trip;
  let partialTripIterator = 0;
  for await(let i = 0; i<= chat.length; i++) {
    switch (chat[i].question.followingAnswerAttribute) {
      case 'tripStartDateTime':
        trip.tripStart = chat[i].answer;
        break;
      case 'tripEndDateTime':
        trip.tripEnd = chat[i].answer;
        break;
      case 'tripDestinations':
        trip.tripDestinations = chat[i].answer;
        break;
      case 'firstPartialTripDestination':
        break;
      case :
      case :
      case :
      case :
      case :
      case :
      case :
      case :
      case :
      case :
      case :
      case :
      case :
      case :
      case :
      case :
      case :
      case :
      case :
      case :
      case :
      case :
      case :
      case :
      case :
      case :
      case :
      case :
      case :
      case :


    }
  }
}

export default { extractInformationOutOfChat };