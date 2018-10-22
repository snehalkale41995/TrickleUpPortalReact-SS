import React, { Component } from "react";
import { Button, Col, Row, FormGroup } from "reactstrap";
import VideoCards from "../../components/Cards/VideoCards";
import CardLayout from "../../components/Cards/CardLayout";
import { Link } from "react-router-dom";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import Loader from "../../components/Loader/Loader";
export default class MediaList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  componentWillMount() {
    let compRef = this;
    setTimeout(() => {
      compRef.setState({
        loading: false
      });
    }, 2000);
  }
  onClickVideo( media) {
    //TODO
    //Send data to media form for edit
    
  }
  render() {
    let videoCards = mediaListControl.map((media, idx) => {
      return (
        <Col xs="12" md="3" key={idx}>
          <div >
            <VideoCards
              category={media.category}
              subCategory={media.subCategory}
              autoPlay={false}
              mute={true}
              id={idx}
              onClick={(e) => this.onClickVideo( media)}
            >
              <VideoPlayer source={media.mediaURL} mute={true} />
            </VideoCards>
          </div>
        </Col>
      );
    });

    return this.state.loading ? (
      <Loader loading={this.state.loading} />
    ) : (
      <div style={{ marginTop: 30 }}>
        <CardLayout name="Media List">
          <FormGroup row>
          <Col xs="12" md="11" />
            <Col md="1" style={{marginLeft: -50 ,marginTop: -55}}>
              <Link to={`${this.props.match.url}/media`}>
                <Button type="button" className="theme-positive-btn">
                  <i className="fa fa-plus" />&nbsp; Add media
                </Button>
              </Link>
              &nbsp;&nbsp;
            </Col>
          </FormGroup>
          <Row>{videoCards}</Row>
        </CardLayout>
      </div>
    );
  }
}

const mediaListControl = [
  {
    id: 0,
    category: "Crops",
    subCategory: "Chilli",
    mediaURL: "http://192.168.101.20:1826/MediaContent/chilli_crop.mp4"
  },
  {
    id: 1,
    category: "Crops",
    subCategory: "Chilli",
    mediaURL: "http://192.168.101.20:1826/MediaContent/chilli_crop.mp4"
  },
  {
    id: 2,
    category: "Crops",
    subCategory: "Chilli",
    mediaURL: "http://192.168.101.20:1826/MediaContent/chilli_crop.mp4"
  },
  {
    id: 3,
    category: "Live stock",
    subCategory: "Goat",
    mediaURL: "http://192.168.101.20:1826/MediaContent/chilli_crop.mp4"
  },
  {
    id: 4,
    category: "Live stock",
    subCategory: "Cow",
    mediaURL: "http://192.168.101.20:1826/MediaContent/chilli_crop.mp4"
  },
  {
    id: 5,
    category: "Live stock",
    subCategory: "Sheep",
    mediaURL: "http://192.168.101.20:1826/MediaContent/chilli_crop.mp4"
  },
  {
    id: 6,
    category: "Live stock",
    subCategory: "Goat",
    mediaURL: "http://192.168.101.20:1826/MediaContent/chilli_crop.mp4"
  },
  {
    id: 7,
    category: "Live stock",
    subCategory: "Buffalo",
    mediaURL: "http://192.168.101.20:1826/MediaContent/chilli_crop.mp4"
  },
  {
    id: 8,
    category: "Crops",
    subCategory: "Bhendi",
    mediaURL: "http://192.168.101.20:1826/MediaContent/chilli_crop.mp4"
  },
  {
    id: 9,
    category: "Crops",
    subCategory: "Bhendi",
    mediaURL: "http://192.168.101.20:1826/MediaContent/chilli_crop.mp4"
  },
  {
    id: 10,
    category: "Crops",
    subCategory: "Bhendi",
    mediaURL: "http://192.168.101.20:1826/MediaContent/chilli_crop.mp4"
  },
  {
    id: 11,
    category: "Small business",
    subCategory: "Vendor",
    mediaURL: "http://techslides.com/demos/sample-videos/small.mp4"
  },
  {
    id: 12,
    category: "Small business",
    subCategory: "Transport",
    mediaURL: "http://techslides.com/demos/sample-videos/small.mp4"
  },
  {
    id: 13,
    category: "Small business",
    subCategory: "Vendor",
    mediaURL: "http://techslides.com/demos/sample-videos/small.mp4"
  }
];
