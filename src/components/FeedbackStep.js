import React from "react";
import styled from "@emotion/styled";

export default function FeedbackStep({ number, children: heading }) {
  return (
    <Layout>
      <StepNumber>{number}</StepNumber>
      <Heading>{heading}</Heading>
    </Layout>
  );
}
const Layout = styled.div`
  display: flex;
  height: 24px;
  margin-top: 12px;
`;
const StepNumber = styled.div`
  background: black;
  border-radius: 50%;
  height: 24px;
  width: 24px;
  color: white;
  text-align: center;
  line-height: 24px;
`;
const Heading = styled.div`
  line-height: 24px;
  padding-left: 8px;
`;
