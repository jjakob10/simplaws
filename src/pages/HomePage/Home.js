import React from "react";
import { Link } from "react-router-dom";
import AppsIcon from "@material-ui/icons/Apps";
import { Avatar } from "@material-ui/core";

import "./Home.css";
import Search from "../../components/Search/Search";

const Home = () => {
  return (
    <div className="home">
      <div className="home__header">
        <div className="home__headerLeft">
          <a href="https://simplaws.netlify.app">Back</a>
        </div>

        <div className="home__headerRight">
          <a href="https://simplaws.netlify.app/products.html">How To Use Simplaws</a>
          <AppsIcon />
          <Avatar src="https://i.pinimg.com/736x/3b/be/65/3bbe65dd575375f052d7f0cba5c086b2.jpg" />
        </div>
      </div>

      <div className="home__body">
        <img
          src="https://media.discordapp.net/attachments/809080871181221958/823672092394258443/unknown.png"
          alt="logo" onClick={e => window.open("https://simplaws.netlify.app")}
        />

        <div className="home__inputContainer">
          <Search />
        </div>
      </div>
    </div>
  );
};

export default Home;
