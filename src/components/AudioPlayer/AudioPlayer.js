import React from "react";
import ReactAudioPlayer from "react-audio-player";
const AudioPlayer = props => (
  <div className="w-auto align-self-xl-center">
    <ReactAudioPlayer
      muted={props.muted}
      src={props.source}
      title={props.title}
      controls={["PlayPause", "Seek", "Time", "Volume"]}
      autoPlay={props.autoPlay}
    />
  </div>
);

export default AudioPlayer;
