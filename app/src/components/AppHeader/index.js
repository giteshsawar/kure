import React from "react";

import './style.css';

export default function AppHeader() {
  return (
    <div className="app_header">
      <div className="header">
        <div className="back_control">
          <span className="back_btn">{`<`}</span>
        </div>
        <div className="window_name">Chat</div>
      </div>
    </div>
  );
}
