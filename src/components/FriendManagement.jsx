import { useEffect, useState } from "react";
import FormSplitBill from "./FormSplitBill";
import Friend from "./Friend";

function FriendManagement() {
  const [friends, setFriends] = useState([]); // اصلاح تایپو
  const [name, setName] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [selected, setSelected] = useState(null);
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  useEffect(() => {
    const storedFriends = JSON.parse(localStorage.getItem("friends")) || [];
    setFriends(storedFriends); // اصلاح تایپو
  }, []);

  function handleAddFriend() {
    if (name.trim()) {
      const id = crypto.randomUUID();
      const newFriend = {
        id: id,
        name: name.trim(),
        image: `${image}?=${id}`,
        balance: 0,
      };
      const updatedFriends = [...friends, newFriend];
      setFriends(updatedFriends);
      localStorage.setItem("friends", JSON.stringify(updatedFriends));
      setName("");
      setShowAdd(false);
      setImage("https://i.pravatar.cc/48");
    }
  }

  function handleRemove(personId) {
    const updatedFriends = friends.filter((person) => person.id !== personId);
    setFriends(updatedFriends);
    localStorage.setItem("friends", JSON.stringify(updatedFriends));
  }

  function handleSelected(person) {
    setSelected((prevSelected) =>
      prevSelected?.id === person.id ? null : person
    );
    setShowAdd(false);
  }

  return (
    <main className="flex w-[80%] mx-auto py-4">
      <div className="flex  text-lg w-full gap-6  ">
        <div className="w-[45%] px-7 py-4 bg-stone-100  rounded-lg space-y-10   ">
          <div className="space-y-10 overflow-auto h-[432px]">
            {friends.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <p className="text-center text-[30px] text-stone-600 font-bold">
                  please add friend
                </p>
              </div>
            )}
            {friends.map((friend) => (
              <Friend
                friend={friend}
                image={image}
                onSelected={handleSelected}
                onRemove={handleRemove}
                selected={selected}
                key={friend.id}
              />
            ))}
          </div>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="bg-orange-400 py-1 px-3 text-[16px] font-semibold rounded-lg "
          >
            {showAdd ? "Close add friend" : "Open add friend"}
          </button>

          {showAdd && (
            <div className="bg-stone-200 rounded-lg h-[80px] flex justify-between items-center px-4 py-2 ">
              <div>
                <span className="text-stone-600 font-[500] text-[16px]">
                  👫 Friend name :{" "}
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-lg py-[2px] px-2 border-[1px] border-stone-400 font-semibold"
                />
              </div>

              <button
                className="py-1 px-6 rounded-lg bg-orange-400 text-[16px] font-semibold"
                onClick={handleAddFriend}
              >
                Add friend
              </button>
            </div>
          )}
        </div>
        <div className="w-[40%]">
          {selected && (
            <div className=" bg-[#fff4e6] rounded-lg px-10 py-10 ">
              <FormSplitBill selected={selected} setSelected={setSelected} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default FriendManagement;
