import React, { Component } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from "reactstrap";
import classnames from "classnames";
import StateList from "../StateMaster/StatesList";
import DistrictList from "../DistrictMaster/DistrictsList";
import VillageList from "../VillageMaster/VillageList";
import GrampanchayatList from "../Grampanchayat/GrampanchayatList";

const tabsList = [
  { id: "1", name: "States" },
  { id: "2", name: "Districts" },
  { id: "3", name: "Grampanchayats" },
  { id: "4", name: "Villages" }
];

export default class Address extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1"
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    let tabs = tabsList.map((tab, idx) => {
      return (
        <NavItem key={idx} className="address-nav">
          <NavLink
            className={classnames({
              active: this.state.activeTab === tab.id
            })}
            onClick={() => {
              this.toggle(tab.id);
            }}
          >
            <div className="address-nav">{tab.name}</div>
          </NavLink>
        </NavItem>
      );
    });
    return (
      <Row className="address-tabs">
        <Col>
          <Nav tabs style={{ backgroundColor: "#ED734A" }}>
            {tabs}
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <StateList {...this.props} />
            </TabPane>
            <TabPane tabId="2">
              <DistrictList {...this.props} />
            </TabPane>
            <TabPane tabId="3">
              <GrampanchayatList {...this.props} />
            </TabPane>
            <TabPane tabId="4">
              <VillageList {...this.props} />
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    );
  }
}
