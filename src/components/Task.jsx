export default ({ title, modes, dispatch }) => {
  const handleRemove = (item) => {
    dispatch({ type: "remove", payload: item });
  };

  const handleComplete = (item) => {
    dispatch({ type: "complete", payload: item });
  };

  const actionButtons = {
    remove: (
      <button
        class="text-red-500 hover:bg-red-500 hover:text-white border-1 rounded-sm px-1.5"
        onClick={() => {
          handleRemove(title);
        }}
      >
        ✕
      </button>
    ),
    complete: (
      <button
        class="text-green-500 hover:bg-green-500 hover:text-white border-1 rounded-sm px-1.5"
        onClick={() => {
          handleComplete(title);
        }}
      >
        ✓
      </button>
    ),
  };

  const enableActions = () => {
    const buttons = [];
    for (let mode of modes) {
      buttons.push(actionButtons[mode]);
    }
    return buttons;
  };

  return (
    <div class="mt-2" id="list-item">
      <p class="inline mr-2">{title}</p>
      {...enableActions()}
    </div>
  );
};
