import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedChatUser } from "../../../redux/slices/userslice";

export default function LeftCard({ name, imgUrl, _id, count }) {
  const dispatch = useDispatch();
  const { selectedChatUser } = useSelector((store) => store.user);

  return (
    <div
      className={
        selectedChatUser == _id ? "chat_list active_chat" : "chat_list"
      }
      id="user-card-t"
      onClick={() => dispatch(setSelectedChatUser({ user: _id }))}
    >
      <div
        className="chat_people"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div className="chat_img">
          {" "}
          <img
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            src={imgUrl}
            alt="sunil"
          />{" "}
        </div>
        <div className="chat_ib">
          <h5 style={{ marginTop: 5 }}>{name}</h5>
        </div>
        {count > 0 && (
          <div>
            <p
              style={{
                backgroundColor: "dodgerblue",
                padding: 5,
                color: "white",
                borderRadius: "50%",
                width: 20,
                height: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {count}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
