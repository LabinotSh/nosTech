import React from "react";
import { Card } from "react-bootstrap";
import "./cards.css";

const Cards = () => {
  const cardInfo = [
    {
      image: require("../../assets/images/letter.png"),
      title: "Employable Skills",
      text:
        "Build employable skills by learning from step-by-step tutorials, in the most thorough ways possible.",
    },
    {
      image: require("../../assets/images/developer.png"),
      title: "Reliable Content",
      text:
        "Study using reliable content by real-life developers, teaching you the latest technologies in the industry.",
    },
    {
      image: require("../../assets/images/clock.png"),
      title: "Easy Time Management",
      text:
        "Learn on your time. Save the courses you need, and start learning at your own pace.",
    },
  ];
  const renderCards = (card, index) => {
    return (
      <Card key={index} className="box crd">
        <span className="spans" />
        <span className="spans" />
        <span className="spans" />
        <span className="spans" />
        <Card.Img
          style={{ width: "50px", height: "50px" }}
          className="icons"
          src={card.image}
        />
        <Card.Body>
          <Card.Title className="text-center card-title">
            {card.title}
          </Card.Title>
          <Card.Text className="text-center txt">{card.text}</Card.Text>
        </Card.Body>
      </Card>
    );
  };
  return <div className="grid">{cardInfo.map(renderCards)}</div>;
};

export default Cards;
