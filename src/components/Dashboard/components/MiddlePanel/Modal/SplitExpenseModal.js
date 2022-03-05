import React, { useEffect, useState } from "react";
import { splitTypeArr } from "../../../../../config/friendsConfig";
import "./AddExpenseModal";

function SplitExpenseModal({
  selectedFriends = [],
  amount = 0,
  onExpenseTypeChange,
}) {
  const [activeExpenseType, setExpenseType] = useState(0);

  useEffect(() => {
    console.log("Selected Friends in SplitExpenseModal::", selectedFriends);
    if (selectedFriends.length == 0) {
      setExpenseType(0);
    }
  }, [selectedFriends]);

  useEffect(() => {
    console.log("amount in SplitExpenseModal::", amount);
  }, [amount]);

  return (
    <div id="settle_up_form">
      <div className="body">
        {selectedFriends?.length == 1 && (
          <div style={{ textAlign: "center" }} className="iou_buttons">
            {splitTypeArr.map((item, index) => {
              return (
                <a
                  className={`slim-button wide ${activeExpenseType == index ? "selected" : ""
                    }`}
                  data-split-type="iou"
                  onClick={() => {
                    setExpenseType(item?.id);
                    onExpenseTypeChange(item?.id);
                  }}
                >
                  {item?.text}
                </a>
              );
            })}

            <hr
              style={{
                background: "#eee",
                border: "none",
                height: "1px",
                margin: "10px 0",
              }}
            />
          </div>
        )}
        {/* {activeExpenseType == 0 ? (
          <div className="split-details">
            <div
              className="btn-group btn-group-inline"
              data-toggle="buttons-radio"
              id="split_method"
            >
              <button
                className="split_button btn btn-gray equal active"
                data-split-subtype="equal"
                rel="tooltip"
                data-original-title="Split equally"
                style={{
                  marginRight:'10px'
                }}
              >
                =
              </button>
              <button
                className="split_button btn btn-gray unequal"
                data-split-subtype="unequal"
                rel="tooltip"
                data-original-title="Split by exact amounts"
                style={{
                  marginRight:'10px'
                }}
              >
                1.23
              </button>
              <button
                className="split_button btn btn-gray percent"
                data-split-subtype="percent"
                rel="tooltip"
                data-original-title="Split by percentages"
                style={{
                  marginRight:'10px'
                }}
              >
                %
              </button>
            </div>
            
          </div>
        ) : null} */}
      </div>
    </div>
  );
}

export default SplitExpenseModal;
