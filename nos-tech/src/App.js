import React, { useEffect, useState } from "react";
import "./App.css";
import Loader from "./components/icons/Loader";
import Router from "./router/router";

const App = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/wake-up')
    // .then(res => res.json())
    .then(() => {
      setLoading(false)
    })
    .catch(err => console.log(err));

  },[])

  if(loading) return <Loader/>;
  return <Router />;
};

export default App;
