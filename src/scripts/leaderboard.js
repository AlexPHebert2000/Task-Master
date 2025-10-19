const JSON_BIN_ID = "68ed27bdae596e708f119844"

export const getLeaderboard = async () => {
  return (await ((await fetch(`https://api.jsonbin.io/v3/b/${JSON_BIN_ID}/latest`, {metod: "GET"})).json())).record
}

export const updateLeaderboard = async (userData) => {
  console.log("USER DATA: ", userData)
  const response = await getLeaderboard();
  const lb = response.leaderBoard;
  console.log(lb)
  const i = lb.findIndex((user) => user.id === userData.id)
  const modified = [...lb]
  if (i === -1){
    modified.push(userData);
  }
  else {
    modified[i] = userData
  }
  modified.sort((a, b) => b.percentage - a.percentage)
  const options = {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({leaderBoard: modified})
  }
  console.log(options.body)
  await fetch(`https://api.jsonbin.io/v3/b/${JSON_BIN_ID}`, options)
}