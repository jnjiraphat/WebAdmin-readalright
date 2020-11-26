import React from "react";
import styled from "styled-components";
import { Row, Tabs } from "antd";
import Article from "./IndexArticle";
import VocabBox from './IndexVocabBox'

const IndexArea = () => {
  const { TabPane } = Tabs;
  return (
    <RowArea>
      <WhiteArea>
        <TabsStyled defaultActiveKey="1" centered>
          <TabPane tab="Article" key="1">
            <Article />
          </TabPane>
          <TabPane tab="Vocab Box" key="2">
            <VocabBox/>
          </TabPane>
        </TabsStyled>
      </WhiteArea>
    </RowArea>
  );
};

export default IndexArea;

const WhiteArea = styled.div`
  width: 1100px;
  background: #fff;
  padding-right: 15px;
  padding-left: 15px;
  padding-top: 10px;
  padding-bottom: 40px;
  min-height: 500px;
  margin-top: 22px;
  display: flex;
  border-radius: 4px;
`;

const RowArea = styled(Row)`
  display: flex;
  justify-content: center;
`;

const TabsStyled = styled(Tabs)`
  .ant-tabs-tab-btn {
    width: 500px;
    text-align: center;
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #8a63e5 !important;
  }
  .ant-tabs-ink-bar {
    background: transparent;
  }

  .ant-tabs-ink-bar::after {
    content: " ";
    position: absolute;
    left: 50%;
    right: 0;
    bottom: 0;
    height: 2px;
    background: #8a63e5;
    transform: translateX(-50%);
  }
`;
