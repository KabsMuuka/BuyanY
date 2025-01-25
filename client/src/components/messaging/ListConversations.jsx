import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { profile, fetchMessages } from "../../../redux/action/actionCreators";

function MessagesideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /*useSelectors*/
  const storedMessages = useSelector((state) => state.fetchMessages);
  const currentUser = useSelector((state) => state.profile);
  //current logedin user
  const currentUserID = currentUser.phoneNumber; //eg 123

  console.log("currentUserID", currentUserID);

  useEffect(() => {
    dispatch(profile());
    dispatch(fetchMessages());
  }, [dispatch]);

  // Find conversations where the user is either buyer or seller
  const userConversations = storedMessages.filter(
    (c) => c.buyerID === currentUserID || c.sellerID === currentUserID
  );

  // Extract unique conversationIDs from the filtered conversations
  const uniqueConversations = [
    ...new Map(
      userConversations.map((item) => [item.conversationID, item]) //item.conversationID = 1 key , item
    ).values(),
  ];

  // console.log("uniqueConversations", uniqueConversations);
  // console.log("uniqueConversations", uniqueConversations);
  return (
    <>
      <div>
        <p className="text-center font-bold text-gray-700">
          List of conversation
        </p>

        {uniqueConversations.map((c) => {
          // Define the conversation text dynamically based on the user's role
          const chatWith =
            currentUserID === c.buyerID
              ? `Seller ${c.sellerID}`
              : `Buyer ${c.buyerID}`;

          return (
            <div className="flex justify-start shadow-sm">
              <button
                className="flex flex-row mt-4"
                key={c.id}
                onClick={() => {
                  navigate("/chatroom", {
                    state: { conversationID: c.conversationID },
                  });
                }}
              >
                <span className="text-gray-700 rounded-md p-3 shadow-md">{`Chat with ${chatWith}`}</span>
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default MessagesideBar;
