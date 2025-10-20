export const getQuote = async () => {
  const options = {
    method: "GET",
  }
  return (await (fetch("https://api.quotable.io/quotes/random", options))).json()
}