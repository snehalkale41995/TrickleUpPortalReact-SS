import React from "react";
import { ScaleLoader } from "react-spinners";

const Loader = props => (
  <div style={{ marginLeft: 500, marginTop: 251 }} className="animated fadeIn">
    <ScaleLoader color={"#e1542e"} loading={props.loading} />
  </div>
);

export default Loader;
