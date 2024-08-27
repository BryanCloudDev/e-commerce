export const moment = {
  // add in here more methods related to dates if necessary

  getCurrentDate(): Date {
    const currentDate = new Date()
    const newDateStringBasedInTimeZone = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
      timeZone: 'America/Guatemala'
    }).format(currentDate)

    return new Date(newDateStringBasedInTimeZone)
  }
}
