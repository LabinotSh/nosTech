import React from "react";
import { Card } from "react-bootstrap";
import "./cards.css";

const Cards = () => {
  const cardInfo = [
    {
      image: require("../../assets/images/letter.png"),
      title: "Employable Skills",
      text:
        "Nunc pulvinar nunc eu metus porttitor sagittis et vitae mauris. Nam porta erat at dictum pulvinar.",
    },
    {
      image: require("../../assets/images/developer.png"),
      title: "Reliable Content",
      text:
        "Nunc pulvinar nunc eu metus porttitor sagittis et vitae mauris. Nam porta erat at dictum pulvinar.",
    },
    {
      image: require("../../assets/images/clock.png"),
      title: "Easy Time Management",
      text:
        "Nunc pulvinar nunc eu metus porttitor sagittis et vitae mauris. Nam porta erat at dictum pulvinar.",
    },
  ];

  const renderCards = (card, index) => {
    return (
      <Card key={index} className="box">
        <Card.Img
          style={{ width: "50px", height: "50px" }}
          className="icons"
          src={card.image}
        />
        <Card.Body>
          <Card.Title className="text-center">{card.title}</Card.Title>
          <Card.Text className="text-center txt">{card.text}</Card.Text>
        </Card.Body>
      </Card>
    );
  };
  return <div className="grid">{cardInfo.map(renderCards)}</div>;
};

export default Cards;
