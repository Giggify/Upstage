export const filterEventsbyDates=(minDate,maxDate,events)=>{
  if (minDate || maxDate) {
    let unfilteredEvents=events
    let minUnix=Date.parse(minDate)
    let maxUnix=Date.parse(maxDate)+86400000
    const fitsDates=(event)=>{
      let eventDateUnix=new Date(event.date).getTime()
      if (minUnix && !maxUnix) {
        return minUnix <= eventDateUnix
      } else if (maxUnix && !minUnix) {
        return eventDateUnix<= maxUnix
      } else if (minUnix && maxUnix){
        return minUnix <= eventDateUnix && eventDateUnix<= maxUnix
      }
    }
    return unfilteredEvents.filter(fitsDates)
  } else {
    return undefined
  }
}
