import React, { useState, useEffect } from "react";
import SendBird from "sendbird";

import AppHeader from "../AppHeader";
import ChatWindow from "../ChatWindow";
import { REQUEST_PATH } from "../../constants/common";

import "./style.css";

export default function Home() {
  const [chatChannel, setChatChannel] = useState();
  const [channelHandler, setChannelHandler] = useState();
  const [messageParams, setMessageParams] = useState();
  const [inputValue, setInputValue] = useState("gsawariya");
  const [sb, setSendbirObj] = useState();
  const [user, setUserDetails] = useState();
  const [chatChannelUrl, setChatChannelUrl] = useState();

  const getSendbirdApi = (username) => {
    const options = {
      method: "post",
      body: JSON.stringify({ username }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(`${REQUEST_PATH}/fetchUser`, options)
      .then((response) => {
        response.json().then((data) => {
          console.log("data received", data);
          const { user, sendbirdApi, channelUrl } = data;
          if (user) {
            setUserLink(user, channelUrl);
            setSendbirdObject(sendbirdApi);
          }
        });
      })
      .catch((err) => {
        console.log("error ", err);
      });
  };

  const setUserLink = (user, channelUrl) => {
    setUserDetails(user);
    setChatChannelUrl(channelUrl);
  };

  const setSendbirdObject = (apiKey) => {
    const sendb = new SendBird({ appId: apiKey });
    setSendbirObj(sendb);
  };

  const updateUserInfo = () => {
    sb.updateCurrentUserInfo(user.username, null, function (response, error) {
      if (error) return console.log("error updating user", error);

      console.log('user name updated', response);
    });
  };

  const connectToServer = () => {
    console.log("sendbird obj", sb);
    sb.connect(user._id, function (user, error) {
      if (error) return console.log("error connecting to sendbird", error);

      console.log("user connected to server", user);
      openSbChannel(chatChannelUrl);
      updateUserInfo();
    });
  };

  const openSbChannel = (channelUrl) => {
    console.log("we have channel url", channelUrl);
    if (channelUrl) {
      sb.OpenChannel.getChannel(channelUrl, function (openChannel, error) {
        if (error) return console.log("error getting channel", error);

        setSendgridConfig(openChannel);
      });
    } else {
      sb.OpenChannel.createChannel((openChannel, error) => {
        if (error) return console.log("error opening channel", error);

        console.log("openChannel", openChannel);
        const options = {
          method: "post",
          body: JSON.stringify({ SBChannelUrl: openChannel.url }),
          headers: {
            "Content-Type": "application/json",
          },
        };

        fetch(`${REQUEST_PATH}/setChannelUrl`, options)
          .then((response) => {
            response.json().then((data) => {
              console.log("data received", data);
              setSendgridConfig(openChannel);
            });
          })
          .catch((err) => {
            console.log("error ", err);
          });
      });
    }
  };

  const addChannelHandler = () => {
    console.log("add channel handler", sb);
    sb.addChannelHandler(1234, channelHandler);
  };

  const setSendgridConfig = (openChannel) => {
    const handler = new sb.ChannelHandler();
    const params = new sb.UserMessageParams();
    setChannelHandler(handler);
    setMessageParams(params);
    setChatChannel(openChannel);
  };

  const openChatWindow = () => {
    getSendbirdApi(inputValue);
  };

  const getInputValue = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (sb) connectToServer();
    return () => {};
  }, [sb]);

  return (
    <div className="home_page">
      <AppHeader />
      {chatChannel ? (
        <ChatWindow
          chatChannel={chatChannel}
          channelHandler={channelHandler}
          messageParams={messageParams}
          addChannelHandler={addChannelHandler}
          userId={user._id}
        />
      ) : (
        <div className="enter_username">
          <input
            type="text"
            placeholder="enter username"
            value={inputValue}
            onChange={getInputValue}
          />{" "}
          <br />
          <button onClick={openChatWindow}>Start chat</button>
        </div>
      )}
    </div>
  );
}
