function getSimpleDate(todaysFullDate) {
  return (`${todaysFullDate.getMonth() + 1} / ${todaysFullDate.getDate()} / ${todaysFullDate.getFullYear()}`)
}

module.exports = {
  getSimpleDate,
}
