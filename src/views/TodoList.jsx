import Task from "../components/Task";
import Pomodoro from "./Pomodoro";

const listStyle = "flex flex-col items-center w-full p-4"
const listSurfaceStyle = "bg-[rgb(163,131,88)] rounded-3xl border-[rgb(132,105,70)] border-2 drop-shadow-2xl/30 flex-col flex items-center p-4"

export default ({ inProgress, complete, dispatch, timeState }) => {
  return (
    <div className="flex flex-col items-center">
      <Pomodoro timeState={timeState} />
      <hr className="my-5 w-lg" />
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 size-full">
        <div className={listSurfaceStyle}>
          <h2 className="font-semibold text-xl text-white">In Progress</h2>
          <div className={listStyle}>
            {inProgress.map((task, index) => (
              <Task title={task} key={index} dispatch={dispatch} modes={["complete"]} />
            ))}
          </div>
        </div>

        <div className={listSurfaceStyle}>
          <h2 className="font-semibold text-xl text-white">Complete</h2>
          <div className={listStyle}>
            {complete.map((task, index) => (
              <Task title={task} key={index} dispatch={dispatch} modes={["undo"]} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
