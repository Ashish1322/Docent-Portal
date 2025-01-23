import React from "react";
import UserCard from "./UserCard";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
export default function User() {
  const { persons } = useSelector((store) => store.user);
  return (
    <div className="container my-4">
      <SearchBar />
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {persons.length == 0 && <p>No Users Found</p>}
        {persons.map((item, index) => (
          <UserCard
            key={index}
            name={item?.name}
            email={item?.email}
            profilePic={item?.profilePic}
            address={item?.address}
            about={item?.about}
            role={item?.role}
            _id={item?._id}
          />
        ))}
      </div>
    </div>
  );
}
