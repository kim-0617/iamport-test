import axios from "axios";
import React, { useState, useEffect } from "react";

type User = {
  userId?: number;
  id?: number;
  title?: string;
  completed?: boolean;
};

function Assignment() {
  const [user, setUser] = useState<User>({});

  useEffect(() => {
    console.log("useEffect Running");
    const fetchData = async () => {
      const res = await axios("https://jsonplaceholder.typicode.com/todos/1");
      setUser(res.data);
    };
    fetchData();
  });
  return (
    <div>
      <p>{user?.title}</p>
    </div>
  );
}

export default Assignment;
