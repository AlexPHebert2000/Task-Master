const JSON_BIN_ID = "68ed27bdae596e708f119844"

export const getLeaderboard = async () => {
  const res = (await ((await fetch(`https://api.jsonbin.io/v3/b/${JSON_BIN_ID}/latest`, {metod: "GET"})).json())).record
  return res
}

export const updateLeaderboard = async (userData) => {
  const response = await getLeaderboard();
  const lb = response.leaderBoard;
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
  await fetch(`https://api.jsonbin.io/v3/b/${JSON_BIN_ID}`, options)
}

export const expireLeaderboard = async () => {
  const {initialization} = getLeaderboard();
  const timestamp = Date.parse(initialization);

  if (Date.now() - timestamp >= 86400000){
    await fetch(`https://api.jsonbin.io/v3/b/${JSON_BIN_ID}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({initialization: new Date().toJSON()})
    });

    await fetch(`https://api.jsonbin.io/v3/b/${JSON_BIN_ID}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({leaderBoard: []})
    });
  }
}