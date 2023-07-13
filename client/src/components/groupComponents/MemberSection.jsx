import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MemberSection({ groupId, members }) {
  return (
    <div className="mx-5 my-4 max-w-4xl">
      <h1 className="text-3xl font-bold pb-4">Members</h1>
      <div className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <UserCard
            key={member.user_id}
            id={member.user_id}
            name={member.user_name}
            email={member.email}
            img={`http://localhost:8000${member.profile_pic}`}
          />
        ))}
      </div>
    </div>
  );
}

function UserCard({ name, email, img, id }) {
  return (
    <Link
      className="px-2 py-4 border rounded-md flex gap-2 max-w-sm"
      to={`/UserProfile/${id}`}
    >
      <img
        className="w-16 h-16 rounded-full border-4 border-slate-50 object-cover"
        src={img}
      />
      <div>
        <h1 className="text-lg font-bold ">{name}</h1>
        <p className="text-sm font-normal">{email}</p>
      </div>
    </Link>
  );
}

export default MemberSection;
