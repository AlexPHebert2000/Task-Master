export const getLeaderboard = async () => {
  return (await ((await fetch("https://api.jsonbin.io/v3/b/68ed27bdae596e708f119844", {metod: "GET"})).json())).record
}