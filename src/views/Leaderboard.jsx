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
      LeaderBoard
      <div>{JSON.stringify(leaderboard)}</div>
    </div>
  )
}