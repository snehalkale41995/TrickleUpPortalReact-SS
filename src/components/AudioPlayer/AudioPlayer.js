import React from "react";
import ReactAudioPlayer from "react-audio-player";

const AudioPlayer = props => (
  <div className="animated fadeIn">
    <ReactAudioPlayer
      muted={props.muted}
      src={props.source}
      title={props.title}
      controls={["PlayPause", "Seek", "Time", "Volume"]}
      autoPlay={props.autoPlay}
      loop
    />

    {/* <Video
      muted={props.mute}
      autoPlay={props.autoPlay}
      loop
      controls={["PlayPause", "Seek", "Time", "Volume", "Fullscreen"]}
    >
      <source src={props.source} />
    </Video> */}
  </div>
);

export default AudioPlayer;
