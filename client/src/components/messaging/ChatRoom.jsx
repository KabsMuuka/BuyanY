import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { profile } from "../../action/actionCreators";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../../action/actionCreators";
import { fetchMessages } from "../../action/actionCreators";
import { fetchUsers } from "../../action/actionCreators";
import { useLocation } from "react-router-dom";

import io, { connect } from "socket.io-client";
const socket = io.connect("http://localhost:4000");

function ChatRoom() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [userInput, setUserInput] = useState("");
  const [previousMessages, setPreviousMessages] = useState([]);
  const [displayname, setDisplayname] = useState("");
  const [isCurrentUserSeller, setIsCurrentUserSeller] = useState(null);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null); // Create a ref to the last message
  /*useSelectors*/
  const storedMessages = useSelector((state) => state.fetchMessages);
  const posts = useSelector((state) => state.fetchPost);
  const currentUser = useSelector((state) => state.profile);
  //
  const currentUserID = currentUser.phoneNumber; // Replace with actual user ID
  const currentUserRole = isCurrentUserSeller ? "seller" : "buyer";
  const sellersID = location.state?.sellers_id; //sellerID on buyer click

  const conversationID =
    location.state?.conversationID || `${currentUserID}-${sellersID}`;

  console.log("conversationID", conversationID);

  useEffect(() => {
    dispatch(profile());
    dispatch(fetchUsers());
    dispatch(fetchPosts());
    dispatch(fetchMessages());
  }, [dispatch]);

  useEffect(() => {
    const isCurrentUserSeller = Array.isArray(posts.image)
      ? posts.image.some((post) => post.userNumber === currentUserID)
      : [];
    setIsCurrentUserSeller(isCurrentUserSeller); //ture || false
  }, [posts, currentUserID]);

  useEffect(() => {
    //determine the room to join dynamically
    if (conversationID) {
      socket.emit("joinRoom", conversationID); // Join the room
    }
    socket.on("chat", (data) => {
      if (data.conversationID === conversationID) {
        setMessages((prevMessages) => [...prevMessages, data]); // Only add messages for the current conversation
      }
    });
    return () => {
      socket.off("chat"); // Cleanup listener on unmount
    };
  }, [conversationID]);

  //user sending a message

  const handleSendMessage = () => {
    const senderID = currentUserID;
    const buyerID =
      currentUserRole === "buyer"
        ? currentUserID
        : conversationID.split("-")[0];

    const sellerID =
      currentUserRole === "seller"
        ? currentUserID
        : conversationID.split("-")[1];

    const currentDate = new Date();
    const todaysDate = currentDate.toLocaleDateString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });
    const currentTime = currentDate.toLocaleTimeString();

    socket.emit("sendMessage", {
      buyerID,
      sellerID,
      conversationID,
      senderID,
      message: userInput,
      currentTime,
      todaysDate,
    });

    setUserInput("");
  };

  //filter previous messages based on userID
  useEffect(() => {
    const userConversations = storedMessages.filter(
      (c) => c.conversationID === conversationID
    );
    console.log("storedMessages", storedMessages);

    console.log(userConversations);
    // Extract unique conversationIDs from the filtered conversations
    setPreviousMessages(userConversations);
  }, [conversationID, storedMessages]);

  //for message indentification
  useEffect(() => {
    try {
      const displayNames = {
        [currentUserID]: "Me",
      };
      2;
      setDisplayname(displayNames); //e.g ['me' 'mike']
    } catch (error) {
      console.error("user Number is null or undefined:", error);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Scroll to the bottom whenever the messages array updates
    scrollToBottom();
  }, [messages]);
  // console.log("iscu", previousMessages);

  return (
    <>
      <div>
        <p className="font-semibold text-2xl text-center">Message box </p>
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="bg-white w-[30%] h-[90%] flex flex-col justify-between p-6 rounded-lg shadow-md">
            {/* Messages Section */}
            <div className="flex-grow w-full overflow-y-auto mb-4 space-y-3">
              {/* stored_Messages */}
              {previousMessages &&
                previousMessages.map((data, index) => {
                  const displayName =
                    displayname[data.senderID] || `User ${data.senderID}`;
                  const currentUser = currentUserID === data.senderID; //boolean

                  return (
                    <div
                      key={index}
                      className={`flex ${
                        currentUser ? "justify-end" : "justify-start"
                      } `}
                    >
                      <div
                        className={`p-2 rounded-lg my-2 ${
                          currentUser
                            ? " bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <div className="text-sm font-medium">
                          {currentUser ? "Me" : displayName}
                        </div>
                        <div className="text-sm">{data.message}</div>
                        <time className="text-xs text-gray-500 mt-1 block">
                          {data.currentTime}
                        </time>
                      </div>
                    </div>
                  );
                })}
              {messages &&
                messages
                  .filter(
                    (message) => message.conversationID === conversationID
                  )
                  .map((data, index) => {
                    const displayName =
                      displayname[data.senderID] || `User ${data.senderID}`;
                    //if  userNumber equals data.userNumber
                    const currentUser = currentUserID === data.senderID; //boolean
                    // console.log(isCurrentUser);
                    return (
                      <div
                        key={index}
                        className={`flex ${
                          currentUser ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg my-2 ${
                            currentUser
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <div className="text-sm font-medium">
                            {currentUser ? "Me" : displayName}
                          </div>

                          <div className="text-sm">{data.message}</div>
                          <time className="text-xs text-gray-500 mt-1 block">
                            {data.currentTime}
                          </time>
                        </div>
                      </div>
                    );
                  })}
            </div>

            {/* Message Input Section */}
            <div className="flex items-center w-full">
              <textarea
                placeholder="Type a message"
                onChange={(e) => setUserInput(e.target.value)}
                value={userInput}
                required
                className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
              <button
                className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatRoom;
