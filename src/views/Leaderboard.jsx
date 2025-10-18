import { useEffect, useState } from "react";

import { getLeaderboard } from "../scripts/leaderboard"
export default () => {

  const [leaderboard, setLeaderBoard] = useState(null);


  useEffect(() => {
    const leaderboardFetch = async () => {
      setLeaderBoard(await getLeaderboard());
    }
    leaderboardFetch();
  }, [])
  return (
    <div>
      <h1 className="font-bold text-3xl">Leaderboard</h1>
      <div className="justify-center">
        {
          leaderboard ?
          <ol>
            {
            leaderboard.leaderBoard.map(({user, percentage}) => <li key={user + percentage}>{`${user} : ${percentage}`}</li>)
            }
          </ol>
          : <h2>Please Wait</h2>
        }
      </div>
    </div>
  )
}