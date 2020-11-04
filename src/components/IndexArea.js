import React from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import Icon from "../asset/image/icon.png";
import { Row, Col, Button } from "antd";
import { Tabs } from "antd";

const IndexArea = () => {
  const { TabPane } = Tabs;
  return (
    <RowArea>
      <WhiteArea>
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Tab 1" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </WhiteArea>
    </RowArea>
  );
};

export default IndexArea;

const WhiteArea = styled.div`
  width: 1100px;
  background: #fff;
  min-height: 500px;
  margin-top: 22px;
  display: flex;
  border-radius: 4px;
`;

const RowArea = styled(Row)`
  display: flex;
  justify-content: center;
`;
