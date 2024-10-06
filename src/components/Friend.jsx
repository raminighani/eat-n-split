function Friend({ friend, onSelected, onRemove, selected, image }) {
  return (
    <div className="flex justify-between items-center    ">
      <div className="flex  justify-start items-center gap-3">
        <img src={image} alt={friend.name} className="rounded-full" />
        <div>
          <span className=" text-[24px] font-bold">{friend.name}</span>
          {friend.balance < 0 && (
            <p className="text-red-800 text-[18px] font-semibold">
              You owe {friend.name} {Math.abs(friend.balance)}€
            </p>
          )}
          {friend.balance > 0 && (
            <p className="text-green-800 text-[18px] font-semibold">
              {friend.name} owes you {Math.abs(friend.balance)}€
            </p>
          )}
          {friend.balance === 0 && (
            <p className="text-[18px] font-semibold">
              You and {friend.name} are even
            </p>
          )}
        </div>
      </div>
      <div className="space-x-2">
        <button
          onClick={() => onSelected(friend)}
          className="px-6 py-1 bg-orange-400 rounded-lg align-middle text-[18px] font-semibold  text-black "
        >
          {selected?.id === friend.id ? "close" : "select"}
        </button>
        <button
          onClick={() => onRemove(friend.id)}
          className="px-6 py-1 bg-red-400 rounded-lg align-middle text-stone-100 text-[18px] font-semibold  text-black "
        >
          remove
        </button>
      </div>
    </div>
  );
}

export default Friend;
