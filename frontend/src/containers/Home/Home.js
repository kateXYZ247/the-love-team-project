import React from "react";

function Home(props) {
  return (
    <div>
      {[...new Array(200)].map((a, i) => (
        <div key={i}>Home page</div>
      ))}
    </div>
  );
}

export default Home;
