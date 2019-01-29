import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

interface IProps {
  text: string;
  color: string;
}

const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const Text = styled.span`
  color: ${props => props.color};
`;

const Message: React.SFC<IProps> = ({ text, color }) => (
  <Container>
    <Text color={color}>{text}</Text>
  </Container>
);

Message.prototype = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};

export default Message;
