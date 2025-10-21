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
      <h1 className="font-bold text-3xl mb-5">Leaderboard</h1>
      <div className="items-center">
        {
          leaderboard ?
          <>
          <div className="px-2 py-1 bg-amber-200 border-2 ">
            <p className="font-semibold">{`🥇 ${leaderboard.leaderBoard[0].user} : ${Number(leaderboard.leaderBoard[0].percentage).toFixed(2)}`}</p>
          </div>
          <div className="px-2 py-1 bg-gray-300 border-2 my-2">
            <p className="font-semibold">{`🥈 ${leaderboard.leaderBoard[1].user} : ${Number(leaderboard.leaderBoard[1].percentage).toFixed(2)}`}</p>
          </div>
          <div className="px-2 py-1 bg-orange-300 border-2 my-2">
            <p className="font-semibold">{`🥉 ${leaderboard.leaderBoard[2].user} : ${Number(leaderboard.leaderBoard[0].percentage).toFixed(2)}`}</p>
          </div>
            {
              leaderboard.leaderBoard.slice(3).map(({user, percentage}, index) => (
                <div className="px-2 py-1 border-2 my-2">
                  <p key={index}>{`${user} : ${Number(percentage).toFixed(2)}`}</p>
                </div>
            ))
            }
          </>
          : <h2>Please Wait</h2>
        }
      </div>
    </div>
  )
}