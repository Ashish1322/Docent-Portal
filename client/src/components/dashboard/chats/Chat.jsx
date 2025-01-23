import React, { useRef, useState, useEffect } from "react";
import ClipImage from "../../../assets/clip.png";
import "./chat.css";
import LeftCard from "./LeftCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMessages, setMessages } from "../../../redux/slices/userslice";
import { BASE_URL } from "../../../config";

import socket from "../../../socket";
export default function Chat() {
  const [message, setMessage] = useState("");
  const [unreadCounts, setUnreadCounts] = useState([]);

  const fileRef = useRef(null);
  const { persons, messages, selectedChatUser } = useSelector(
    (store) => store.user
  );
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  function sendMessage() {
    socket.emit("send-message", {
      sender: user?._id,
      receiver: selectedChatUser,
      message: message,
    });
    setMessage("");
  }

  function sendFile() {}

  // unread counts fetch
  const fetchUnreadCounts = () => {
    fetch(`${BASE_URL}/auth/unread-counts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user?.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUnreadCounts(data.unreadCounts);
      })
      .catch((err) => console.log("Error while fetching counts", err));
  };
  const processUnreadCount = (payload) => {
    const { combinedId } = payload;
    const currentCombinedId =
      user?._id > selectedChatUser
        ? user._id + selectedChatUser
        : selectedChatUser + user._id;
    // if this message is for current combinedId
    if (currentCombinedId == combinedId) {
      // then don't consider it as unread as we are already reading it right
      return;
    } else {
      let temp = [...unreadCounts];
      let found = false;
      console.log("befoer", temp);
      for (let item of temp) {
        if (item["_id"] == combinedId) {
          found = true;
          console.log("Found");
          item["count"] += 1;
        }
      }
      if (found == false) {
        temp.push({ _id: combinedId, count: 1 });
      }

      console.log("dsf", temp);
      // update the count for this combined id
      setUnreadCounts([...temp]);
    }
  };
  // everytime receiver changes fetch all the messages and set the listner
  useEffect(() => {
    if (selectedChatUser && user) {
      dispatch(
        fetchAllMessages({ token: user?.token, receiverId: selectedChatUser })
      );
      let combinedId = "";
      if (user?._id > selectedChatUser) {
        combinedId = user._id + selectedChatUser;
      } else {
        combinedId = selectedChatUser + user._id;
      }
      // set listener on combined id
      socket.on(combinedId, (payload) => {
        dispatch(setMessages({ messages: [payload], overWrite: false }));
      });

      // listen for new counts
      socket.on("new-message-count", processUnreadCount);

      return () => {
        socket.removeListener(combinedId);
        socket.removeListener("new-message-count");
      };
    }
  }, [selectedChatUser, user]);

  // Connect to socket server
  useEffect(() => {
    if (user) {
      socket.connect();
      fetchUnreadCounts();
    }

    return () => {
      socket.disconnect();
    };
  }, [user]);

  return (
    <div className="container-fluid" style={{ margin: 0, padding: 0 }}>
      <div className="inbox_people">
        <div className="headind_srch">
          <div className="recent_heading">
            <h4>Chats</h4>
          </div>
        </div>
        <div className="inbox_chat">
          {persons.map((item) => {
            let combinedId =
              item?._id > user?._id
                ? item?._id + user?._id
                : user?._id + item?._id;
            const unread = unreadCounts?.find((u) => {
              return u._id == combinedId;
            });

            return (
              <LeftCard
                name={item?.name}
                imgUrl={item?.profilePic}
                _id={item?._id}
                count={unread?.count || 0}
              />
            );
          })}
        </div>
      </div>
      <div className="mesgs">
        <div className="msg_history">
          {messages.map((message, index) => {
            if (message?.sender?._id == user?._id) {
              return (
                <div key={index} className="outgoing_msg">
                  <div className="sent_msg">
                    {message.file == true ? (
                      <div className="bg-warning p-2">
                        <a
                          href={message.message}
                          style={{ textDecoration: "none" }}
                        >
                          {" "}
                          <i class="fa-solid fa-download"></i>{" "}
                          {giveNameOfFileFromUrl(message.message)}
                        </a>
                      </div>
                    ) : (
                      <p>{message.message}</p>
                    )}
                    <span className="time_date">
                      {" "}
                      {new Date(message.createdAt).toLocaleString()}
                    </span>{" "}
                  </div>
                </div>
              );
            } else {
              return (
                <div key={index} className="incoming_msg">
                  <div className="incoming_msg_img">
                    {" "}
                    <img
                      style={{ width: 50, height: 50, borderRadius: "50%" }}
                      src={message?.sender?.profilePic}
                      alt="sunil"
                    />{" "}
                  </div>
                  <div className="received_msg">
                    <div className="received_withd_msg">
                      {message.file == true ? (
                        <div className="bg-warning p-2">
                          <a
                            href={message.message}
                            style={{ textDecoration: "none" }}
                          >
                            {" "}
                            <i class="fa-solid fa-download"></i>{" "}
                            {giveNameOfFileFromUrl(message.message)}
                          </a>
                        </div>
                      ) : (
                        <p>{message.message}</p>
                      )}

                      <span className="time_date">
                        {" "}
                        {new Date(message.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
          })}

          <div></div>
        </div>
        <div className="type_msg">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
              setMessage("");
            }}
          >
            <div className="input_msg_write">
              <input
                onChange={(e) => setMessage(e.currentTarget.value)}
                value={message}
                type="text"
                className="write_msg"
                placeholder="Type a message"
              />
              <button
                onClick={() => fileRef.current.click()}
                className="msg_send_btn"
                type="button"
              >
                <img width="50px" src={ClipImage} />
              </button>

              <input
                onChange={(e) => sendFile(e.currentTarget.files[0])}
                ref={fileRef}
                style={{ display: "none" }}
                type="file"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
