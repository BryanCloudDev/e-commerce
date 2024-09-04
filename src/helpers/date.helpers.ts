export const moment = {
  // add in here more methods related to dates if necessary

  /**
   * Returns current date based on location.
   * @returns Current date.
   */
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
  },

  /**
   * Formats timestamp in format `mm/dd/yy, hh:mm AM/PM`.
   * @returns Formatted string .
   */
  formatTimestamp(timestamp: number): string {
    const now = new Date(timestamp)

    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      minute: 'numeric',
      hour12: true,
      timeZone: 'America/Guatemala'
    }).format(now)
  }
}
