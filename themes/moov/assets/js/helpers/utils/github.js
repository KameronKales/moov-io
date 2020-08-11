const url = 'https://api.github.com/orgs/moov-io/repos'
const axios = require('axios').default
async function github() {
  const response = await axios.get(url)
  let totalStars = 0
  response.data.forEach(function (items) {
    totalStars += items.stargazers_count
  })
  return totalStars
}

export default github
