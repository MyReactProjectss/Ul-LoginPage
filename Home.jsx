import React from "react";

function Home(props) {
  return (
    <h1>
      {" "}
      Home Page {props.user.firstName} {props.user.lastName}
    </h1>
  );
}

export default Home;
