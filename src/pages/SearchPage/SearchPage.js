import React from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import useGoogleSearch from "../../useGoogleSearch";
import Search from "../../components/Search/Search";

import SearchIcon from "@material-ui/icons/Search";
// import DescriptionIcon from "@material-ui/icons/Description";
// import ImageIcon from "@material-ui/icons/Image";
// import LocalOfferIcon from "@material-ui/icons/LocalOffer";
// import RoomIcon from "@material-ui/icons/Room";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./SearchPage.css";

const SearchPage = () => {
  const [{ term }] = useStateValue();
  const { data } = useGoogleSearch(term); // custom hook!

  return (
    <div className="searchPage">
      <div className="searchPage__header">
        <Link to="/">
          <img
            className="searchPage__logo"
            src="https://media.discordapp.net/attachments/809080871181221958/823672092394258443/unknown.png"
            alt=""
          />
        </Link>

        <div className="searchPage__headerBody">
          <Search hideButtons />

          <div className="searchPage__options">
            <div className="searchPage__optionsLeft">
              <div className="searchPage__option">
                <SearchIcon />
                <Link to="/all">Results</Link>
              </div>

              <div className="searchPage__option">
                <MoreVertIcon />
                lawyer feedback
              </div>
            </div>

            <div className="searchPage__optionsRight">
              <div className="searchPage__option">
                <Link to="/settings">Settings</Link>
              </div>

              <div className="searchPage__option">
                <Link to="/tools">Tools</Link>
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
    </div>
  );
};

export default SearchPage;
