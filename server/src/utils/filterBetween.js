export const filterBetween = ({ searchParam, start, end }) => ({
  [searchParam]: {
    $gte: new Date(+start),
    $lte: new Date(+end),
  }
})

