import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Card, CardBody, FormGroup } from "reactstrap";
import { Bar, Line} from "react-chartjs-2";
import * as graphConstant from "../../constants/GraphConstants";
const data = {
  labels: [
    "Balangir",
    "Malkangiri",
    "Puri",
    "Bhadrak",
    "Bargarh",
    "Kendrapara",
    "Anugul",
    "Jagatsinghapur"
  ],
  datasets: [
    {
      label: "Active Users",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 5,
      pointHitRadius: 10,
      data: [20, 59, 80, 45, 56, 55, 60, 30]
    }
  ]
};

const dataCrops = {
  labels: ["Chilli", "Lady finger", "Tomato", "Onion"],
  datasets: [
    {
      label: "Crops",
      backgroundColor: "#FCACAC",
      borderColor: "#F73B3B",
      borderWidth: 1,
      color: "#ffffff",
      hoverBackgroundColor: "#FCACAC",
      hoverBorderColor: "#F73B3B",
      data: [65, 59, 80, 81]
    }
  ]
};
const dataLiveStock = {
  labels: [
    "Sheep",
    "Cow",
    "Buffalo",
    "Chicken",
    "Goat",
    "Buffalo",
    "Chicken",
    "Goat"
  ],
  datasets: [
    {
      label: "Live stock",
      backgroundColor: "#93D7AB",
      borderColor: "#4dbd74",
      borderWidth: 1,
      color: "#ffffff",
      hoverBackgroundColor: "#93D7AB",
      hoverBorderColor: "#4dbd74",
      data: [30, 59, 20, 90, 45, 20, 90, 45]
    }
  ]
};
const dataSmallBusiness = {
  labels: ["B 1", "B 2", "B 3", "B 4", "B 5"],
  datasets: [
    {
      label: "Small Business",
      backgroundColor: "#7CC3FE",
      borderColor: "#088EFD",
      borderWidth: 1,
      color: "#ffffff",
      hoverBackgroundColor: "#7CC3FE",
      hoverBorderColor: "#088EFD",
      data: [10, 80, 60, 21, 19]
    }
  ]
};

class Dashboard extends Component {
  render() {
    return (
      <div className="animated fadeIn card-marginTop">
        <FormGroup row>
          <Col xs="12" md="12">
            <Card className="text-white bg-dark">
              <CardBody>
                <div className="text-value">
                  Active beneficiaries by villages
                </div>
              </CardBody>
              <div className="chart-wrapper mx-3 div-padding">
                <Line
                  width={120}
                  height={20}
                  options={graphConstant.userOptions}
                  data={data}
                />
              </div>
            </Card>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col xs="12" md="4">
            <Card className="text-white bg-danger">
              <CardBody>
                <div className="text-value">Crops</div>
              </CardBody>
              <div className="chart-wrapper mx-6 div-padding">
                <Bar
                  data={dataCrops}
                  width={100}
                  height={60}
                  options={graphConstant.cropOptions}
                />
              </div>
            </Card>
          </Col>
          <Col xs="12" md="4">
            <Card className="text-white bg-secondary">
              <CardBody>
                <div className="text-value">Small business</div>
              </CardBody>
              <div className="chart-wrapper mx-6 div-padding">
                <Bar
                  data={dataSmallBusiness}
                  width={100}
                  height={60}
                  options={graphConstant.smallBusinessOptions}
                />
              </div>
            </Card>
            {/* <Card >
                <CardBody>
                  <div className="text-value">Small business</div>
                </CardBody>
                <div className="chart-wrapper mx-6" style={{ padding: 20 ,marginTop: -10 }}>
                  <Pie data={dataPie} options={optionsPie} width={80} height={51} />
                </div>
              </Card> */}
          </Col>
          <Col xs="12" md="4">
            <Card className="text-white bg-success">
              <CardBody>
                <div className="text-value">Live stock</div>
              </CardBody>
              <div className="chart-wrapper mx-6 div-padding">
                <Bar
                  data={dataLiveStock}
                  width={100}
                  height={60}
                  options={graphConstant.liveStockOptions}
                />
              </div>
            </Card>
          </Col>
        </FormGroup>
      </div>
    );
  }
}
export const mapStateToProps = state => {
  return {};
};

export const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
