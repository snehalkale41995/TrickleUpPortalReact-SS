import React from "react";
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';

const VideoPlayer = props => (
  <div className="animated fadeIn">
    <Video
      muted={props.mute}
      autoPlay={props.autoPlay}
      loop
      controls={["PlayPause", "Seek", "Time", "Volume", "Fullscreen"]}
    >
      <source src={props.source} />
    </Video>
  </div>
);

export default VideoPlayer;
