import React, { useState } from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@material-ui/core";
import { useStateValue } from "../../context/StateProvider";
import db from ".../../firebase";
import firebase from "firebase";

function TweetBox2() {

  const [{ user }, dispatch] = useStateValue();
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");

  const sendTweet = (e) => {
    e.preventDefault();

    if (tweetMessage.trim() != "") {
      db.collection("lawyer").add({
        email: user.displayName,
        text: tweetMessage,
        image: tweetImage,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

      setTweetMessage("");
      setTweetImage("");
    }
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src={user.photoURL} />
          <input
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder={`Only verified lawyers can post feedback here :)`}
            type="text"
          />
        </div>
        <input
          value={tweetImage}
          onChange={(e) => setTweetImage(e.target.value)}
          className="tweetBox__imageInput"
          placeholder="Optional image UR for accompanying image or gif"
          type="text"
        />

        <Button
          onClick={sendTweet}
          type="submit"
          className="tweetBox__tweetButton"
        >
          Post
        </Button>
      </form>
    </div>
  );
}

export default TweetBox2;