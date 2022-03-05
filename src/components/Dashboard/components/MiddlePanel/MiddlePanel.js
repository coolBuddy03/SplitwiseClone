import React, { useEffect, useState } from "react";
import { dashboardData } from "../../../../config/friendsConfig";
import Modal from "../../../Modal/Modal";
import "./MiddlePanel.css";
import AddExpenseModal from "./Modal/AddExpenseModal";
import SplitExpenseModal from "./Modal/SplitExpenseModal";

function MiddlePanel() {
  const [dashData, setDashData] = useState(dashboardData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [amount, setAmount] = useState(0);
  const [expenseType, setExpenseType] = useState(-1);

  const [isSplitEqualModalOpen, setIsSplitEqualModalOpen] = useState(false);

  const onExpenseTypeChange = (expenseType) => {
    setExpenseType(expenseType);
  };

  const onSaveClick = () => {
    console.log("Selectd Friends::", selectedFriends);
    console.log("Amount::", amount);
    console.log("expenseType", expenseType);
    let obj = { ...dashData };
    if (Number(amount) > 0) {
      if (expenseType == -1 || expenseType == 0) {
        let amo =
          Math.round((Number(amount) / (selectedFriends?.length + 1)) * 100) /
          100;
        obj.totalAmountToRecieved += amo;
        for (let i = 0; i < obj.friendsData.length; i++) {
          for (let j = 0; j < selectedFriends.length; j++) {
            if (selectedFriends[j].id == obj.friendsData[i].id) {
              obj.friendsData[i].amountToPay += amo;
            }
          }
        }
      } else if (expenseType == 1) {
        let amo = Number(amount);
        obj.totalAmountToRecieved += amo;
        for (let i = 0; i < obj.friendsData.length; i++) {
          for (let j = 0; j < selectedFriends.length; j++) {
            if (selectedFriends[j].id == obj.friendsData[i].id) {
              obj.friendsData[i].amountToPay += amo;
            }
          }
        }
      } else if (expenseType == 2) {
        let amo = Number(amount);
        obj.totalAmountToPay += amo;
        for (let i = 0; i < obj.friendsData.length; i++) {
          for (let j = 0; j < selectedFriends.length; j++) {
            if (selectedFriends[j].id == obj.friendsData[i].id) {
              obj.friendsData[i].amountToRecieve += amo;
            }
          }
        }
      }
      setDashData(obj);
      
    }
    setIsSplitEqualModalOpen(false);
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log("After Saving Dashboard Data::", dashData);
  }, [dashData]);

  return (
    <>
      <div id="center_column">
        <div class="dashboard header">
          <div class="topbar">
            <h1>Dashboard</h1>
            <div class="actions">
              <a
                class="btn btn-large btn-orange"
                href="#add_bill"
                onClick={() => {
                  setAmount(0);
                  setIsModalOpen(true);
                  setModalTitle("Add Expense");
                }}
              >
                Add an expense
              </a>
              <a class="btn btn-large btn-mint" href="#settle_up_form">
                Settle up
              </a>
            </div>
          </div>
        </div>

        <div class="clearfix">
          <div id="dashboard_balances">
            <div class="total_balances">
              <div class="block">
                <div class="title">total balance</div>
                <span class="positive">
                  + ₹
                  {dashData.totalAmountToPay + dashData.totalAmountToRecieved}
                </span>

                {/* <span class="positive">+ ₹2680.95</span> */}
              </div>
              <div class="block">
                <div class="title">you owe</div>
                <span class="neutral">₹{dashData.totalAmountToPay}</span>

                {/* <span class="neutral">₹0.00</span> */}
              </div>
              <div class="block">
                <div class="title">you are owed</div>
                <span class="positive">₹{dashData.totalAmountToRecieved}</span>
              </div>
            </div>

            <h2 style={{ position: "relative" }}>
              you owe
              <span class="right">you are owed</span>
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  width: "100%",
                  textAlign: "center",
                  marginLeft: "6px",
                }}
              ></div>
            </h2>

            <div class="summary">
              <div id="people_summary">
                <div class="list">
                  <div class="negatives">
                    {/* {<div
                      style={{
                        textAlign: "left",
                        color: "#999",
                        fontSize: "16px",
                        marginTop: "6px",
                      }}
                    >
                      You do not owe anything
                    </div>} */}
                    <ul>
                      {dashData.friendsData.map((item, index) => {
                        return item?.amountToRecieve && item?.amountToRecieve > 0 ? (
                          <li class="relationship">
                            <a href="#/friends/8376745">
                              <img
                                src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-ruby30-100px.png"
                                alt="Avatar"
                              />
                              <span class="name">{'you owe '+item?.name}</span>
                              <br />
                              <span class="balance owes_me">
                                <span class="amount">₹{item?.amountToRecieve}</span>
                              </span>
                            </a>
                          </li>
                        ) : null;
                      })}
                    </ul>
                  </div>

                  <div class="positives">
                    <ul>
                      {dashData.friendsData.map((item, index) => {
                        return item?.amountToPay && item?.amountToPay > 0 ? (
                          <li class="relationship">
                            <a href="#/friends/8376745">
                              <img
                                src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-ruby30-100px.png"
                                alt="Avatar"
                              />
                              <span class="name">{item?.name}</span>
                              <br />
                              <span class="balance owes_me">
                                owes you
                                <span class="amount">₹{item?.amountToPay}</span>
                              </span>
                            </a>
                          </li>
                        ) : null;
                      })}
                    </ul>
                   
                  </div>

                  <div class="clearfix"></div>
                </div>
              </div>
            </div>
          </div>
          <div id="recent_activity" style={{ display: "none" }}></div>
        </div>
      </div>
      <Modal
        headerTitle={modalTitle}
        isOpen={isModalOpen}
        onModalClose={() => {
          setIsSplitEqualModalOpen(false);
          setIsModalOpen(false);
        }}
      >
        <AddExpenseModal
          expenseType={expenseType}
          onAmountUpdate={(amount) => {
            setAmount(amount);
          }}
          onFriendsUpdated={(friends) => {
            setSelectedFriends(friends);
          }}
          openSplitEqualModal={() => {
            setIsSplitEqualModalOpen(true);
          }}
          onSaveClick={() => {
            onSaveClick();
          }}
          onCloseClick={()=>{
            setIsSplitEqualModalOpen(false);
          }}
        />
      </Modal>
      <Modal
        headerTitle={"Choose split options"}
        isOpen={isModalOpen && isSplitEqualModalOpen}
        onModalClose={() => {
          setIsSplitEqualModalOpen(false);
        }}
        isNoOverLay={true}
        modalStyles={{ right: "0px" }}
      >
        <SplitExpenseModal
          selectedFriends={selectedFriends}
          amount={amount}
          onExpenseTypeChange={onExpenseTypeChange}
        />
      </Modal>
    </>
  );
}

export default MiddlePanel;
