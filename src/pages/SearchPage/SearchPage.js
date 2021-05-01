import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import useGoogleSearch from "../../useGoogleSearch";
import Search from "../../components/Search/Search";
import TweetBox2 from "./TweetBox2";
import Post from "./Post";
import { db } from "../../firebase";
import SearchIcon from "@material-ui/icons/Search";
import FlipMove from "react-flip-move";
import logo from "../../assets/logosquare.png";

// import DescriptionIcon from "@material-ui/icons/Description";
// import ImageIcon from "@material-ui/icons/Image";
// import LocalOfferIcon from "@material-ui/icons/LocalOffer";
// import RoomIcon from "@material-ui/icons/Room";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./SearchPage.css";

const SearchPage = () => {
  const [{ term, user }, dispatch] = useStateValue();
  const { data } = useGoogleSearch(term);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("lawyer")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => doc.data()))
      );
  }, []);

  return (
    <div className="searchPage">
      <div className="searchPage__header">
        <Link to="/">
          <img className="searchPage__logo" src={logo} alt="" />
        </Link>

        <div className="searchPage__headerBody">
          <Search hideButtons />

          <div className="searchPage__options">
            <div className="searchPage__optionsLeft">
              <div className="searchPage__option">
                <SearchIcon />
                <Link to="/">{!user ? "Welcome guest!" : "Hello lawyer!"}</Link>
              </div>

              <div className="searchPage__option">
                <MoreVertIcon />
                <Link to={!user && "/login"}>
                  <div className="header__option">
                    <span className="header__optionLineOne">
                      {!user ? "Are you a lawyer?" : user.email}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {term && (
        <div className="searchPage__results">
          <p className="searchPage__resultCount">
            About {data?.searchInformation.formattedTotalResults} results (
            {data?.searchInformation.formattedSearchTime}
            seconds) for {term}
          </p>

          {data?.items.map((item) => (
            <div className="searchPage__result">
              <a href={item.link}>
                {item.pagemap?.cse_image?.length > 0 &&
                  item.pagemap?.cse_image[0]?.src && (
                    <img
                      src={item.pagemap?.cse_image[0]?.src}
                      alt=""
                      className="searchPage__resultImage"
                    />
                  )}
                {item.displayLink}{" "}
              </a>

              <a href={item.link} className="searchPage__resultTitle">
                <h2>{item.title}</h2>
              </a>

              <p className="searchPage__resultSnippet">{item.snippet}</p>
            </div>
          ))}
        </div>
      )}

      <div className="feed">
        <div className="feed__header">
          <h2>SimpLaws</h2>
          <h4>Recent Lawyer Feedback for {term}</h4>
        </div>
      </div>

      {user ? <TweetBox2 /> : <></>}

      <FlipMove>
        {posts.map((post) => (
          <Post
            key={post.text}
            email={post.email}
            text={post.text}
            image={post.image}
            timestamp={new Date(post.timestamp?.toDate()).toUTCString()}
          />
        ))}
      </FlipMove>
    </div>
  );
};

export default SearchPage;
