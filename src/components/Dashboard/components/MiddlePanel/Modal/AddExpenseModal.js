import React, { useState } from "react";
import { dashboardData } from "../../../../../config/friendsConfig";
import "./AddExpenseModal.css";

function AddExpenseModal({
  openSplitEqualModal,
  onFriendsUpdated,
  onAmountUpdate,
  onSaveClick,
  expenseType,
  onCloseClick
}) {
  const [friendList, showFriendList] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [userName, setUserName] = useState("");
  const [amount, setAmount] = useState();

  const onFrienNameChange = (name) => {
    console.log("user input name::", name);
    let newArr = [];

    newArr = dashboardData.friendsData.filter(
      (item) =>
        item.name.trim().toLowerCase().indexOf(name.trim().toLowerCase()) > -1
    );

    showFriendList(newArr);
    setUserName(name);
  };

  const updateSelectedFriends = (friendInfo) => {
    let alreadyExistAtIndex = -1;
    let newArr = selectedFriends.filter((item, index) => {
      if (item.id == friendInfo.id) {
        alreadyExistAtIndex = index;
      } else {
        return item;
      }
    });
    if (alreadyExistAtIndex > -1) {
      alert("This item has already been added to the list!");
    } else {
      let arr = [...newArr, friendInfo];
      setSelectedFriends(arr);
      onFriendsUpdated(arr);
    }
    showFriendList([]);
    setUserName("");
  };

  const removeFromSelectedFriends = (friendInfo) => {
    let newArr = selectedFriends.filter(
      (item, index) => item.id !== friendInfo.id
    );
    setSelectedFriends(newArr);
    onFriendsUpdated(newArr);
  };

  const onAmountChange = (amount) => {
    setAmount(amount);
    onAmountUpdate(amount);
  };

  return (
    <div id="add_bill">
      <div className="user-select-input-box">
        <div
          style={{
            flexShrink: 0,
          }}
        >
          <span>
            With <strong>you</strong> and:
          </span>
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          {selectedFriends?.length > 0 ? (
            <ul
              style={{
                display: "flex",
              }}
            >
              {selectedFriends.map((item) => {
                return (
                  <li className="selected-friends-details">
                    {item.name}
                    <span
                      className="close-icon"
                      onClick={(id) => removeFromSelectedFriends(item)}
                    >
                      ×
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : null}
          <div>
            <input
              placeholder="Enter names"
              type="text"
              value={userName}
              onChange={(e) => onFrienNameChange(e.target.value)}
              style={{
                height: "30px",
                border: "none",
              }}
            />
          </div>
        </div>
      </div>
      {friendList?.length > 0 ? (
        <div className="friends-list">
          <ul className="select-dropdown">
            {friendList.map((item) => {
              return (
                <li onClick={() => updateSelectedFriends(item)}>{item.name}</li>
              );
            })}
          </ul>
        </div>
      ) : null}
      <div className="body">
        <div className="main_fields">
          <img
            src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png"
            className="category"
          />
          <input
            type="text"
            className="description"
            placeholder="Enter a description"
            style={{ fontSize: "20px" }}
          />
          <div
            id="_size-changing-clone"
            style={{
              fontSize: "20px",
              position: "absolute",
              left: "-9999px",
              fontFamily:
                'Lato, "Helvetica Neue", Helvetica, Arial, sans-serif',
            }}
          ></div>
          <div className="cost_container">
            <span className="currency_code">₹</span>
            <input
              type="text"
              className="cost"
              placeholder="0.00"
              style={{ fontSize: "36px" }}
              onChange={(e) => onAmountChange(e.target.value)}
              value={amount}
            />
          </div>
        </div>

        <div className="human_summary">
          {expenseType <= 0 ? (
            <>
              Paid by <a className="payer">you</a> and split{" "}
              <a
                className="split"
                onClick={() => {
                  openSplitEqualModal();
                }}
              >
                equally
              </a>
              .
              <div className="details">
                (₹
                {amount > 0 ?
                  Math.round((amount / (selectedFriends?.length + 1)) * 100) /
                  100 : 0.00
                }
                /person)
              </div>
            </>
          ) : null}
        </div>
      </div>
      <footer>
        <button class="btn btn-large btn-cancel" data-dismiss="modal" onClick={() => {
          onCloseClick();
        }}>
          Cancel
        </button>
        <button
          class="btn btn-large btn-mint submit"
          onClick={() => {
            onSaveClick();
          }}
        >
          Save
        </button>
      </footer>
    </div>
  );
}

export default AddExpenseModal;
