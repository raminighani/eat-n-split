import { useEffect, useState } from "react";

function FormSplitBill({ selected, setSelected }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const [friends, setFriends] = useState(null);
  const paidByFriend = bill ? bill - paidByUser : ""; // اصلاح تایپو در متغیر
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  useEffect(() => {
    const storedFriends = JSON.parse(localStorage.getItem("friends")) || [];
    setFriends(storedFriends);
  }, []);

  function handleSplitBill(value) {
    const updateFriend = friends.map((friend) =>
      friend.id === selected.id
        ? { ...friend, balance: friend.balance + value }
        : friend
    );
    localStorage.setItem("friends", JSON.stringify(updateFriend));
    setFriends(updateFriend);

    // localStorage.setItem("friends", JSON.stringify(updatedFriends));
    // setFriends(updatedFriends);
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          if (!bill || !paidByUser) {
            e.preventDefault();
            return;
          }

          handleSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
        }}
        className="form font-semibold text-stone-700 text-[16px]"
      >
        <h2 className="titlesplitform">Split a bill with {selected.name}</h2>
        <label className="label">💰 Bill value</label>
        <input
          type="text"
          placeholder="Total Bill"
          value={bill}
          onChange={(e) => setBill(Number(e.target.value))}
          className="input-select"
        />
        <label className="label">🧍‍♀️ Your expense</label>
        <input
          type="text"
          placeholder=" Your expense"
          value={paidByUser}
          onChange={(e) =>
            setPaidByUser(
              Number(e.target.value) > bill
                ? paidByUser
                : Number(e.target.value)
            )
          }
          className="input-select"
        />
        <label className="label">👫 {selected.name}'s expense</label>
        <input
          type="text"
          value={paidByFriend}
          disabled
          className="input-select"
        />

        <label className="label">🤑 Who is paying the bill</label>
        <select
          value={whoIsPaying}
          onChange={(e) => setWhoIsPaying(e.target.value)}
          className="input-select"
        >
          <option value="user">You</option>
          <option value="friend">{selected.name}</option>
        </select>
        <button className=" bg-[#ffa94d] button py-1 rounded-lg ">
          Split Bill
        </button>
      </form>
    </div>
  );
}

export default FormSplitBill;
