export const prettyDate = (date: Date) => new Date(date).toLocaleString('en-us', { month: 'long', year: 'numeric' })
