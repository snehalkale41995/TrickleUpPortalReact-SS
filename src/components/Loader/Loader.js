import React from "react";
import { ScaleLoader } from "react-spinners";

const Loader = props => (
  <div className="animated fadeIn loader-position">
    <ScaleLoader color={"#e1542e"} loading={props.loading} />
  </div>
);

export default Loader;
