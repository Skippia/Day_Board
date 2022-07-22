const baseApiURL = 'http://localhost:5000'
// const baseApiURL = 'https://lormida-dayboard.herokuapp.com/'

//* Constants
const daysWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]
const timeSeparatorOptions = [
    { name: '4 hours', value: '240' },
    { name: '2 hours', value: '120' },
    { name: '1 hours', value: '60' },
]
const startRangeOptions = [
    { name: '06:00', value: '06' },
    { name: '07:00', value: '07' },
    { name: '08:00', value: '08' },
    { name: '09:00', value: '09' },
    { name: '10:00', value: '10' },
    { name: '11:00', value: '11' },
    { name: '12:00', value: '12' },
]
const endRangeOptions = [
    { name: '16:00', value: '16' },
    { name: '17:00', value: '17' },
    { name: '18:00', value: '18' },
]

export { baseApiURL, daysWeek, months, timeSeparatorOptions, startRangeOptions, endRangeOptions }
