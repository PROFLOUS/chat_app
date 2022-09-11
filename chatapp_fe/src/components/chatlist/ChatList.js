import "./ChatListStyle.scss";
import SearchComponent from "./SearchComponent";
import ChatCard from "./ChatCard";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import "simplebar"; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import "simplebar/dist/simplebar.css";
import SearchList from "./SearchList";
import Contex from "../../store/Context";
import ChatCardGroup from "./ChatCardGroup";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ChatList = () => {
  const { state, depatch } = React.useContext(Contex);
  //detructering...
  const { showTabHistorySearch } = state;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="chatlist">
      <SearchComponent />
      {showTabHistorySearch ? (
        <SearchList />
      ) : (
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Tất cả" {...a11yProps(0)} />
              <Tab label="Chưa đọc" {...a11yProps(1)} />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            <div data-simplebar className="listChatCard">
              <ChatCardGroup />
              <ChatCard />
              <ChatCard status />
              <ChatCard status />
              <ChatCard />
              <ChatCard />
              <ChatCard />
              <ChatCard />
              <ChatCard />
              <ChatCard />
              <ChatCard />
              <ChatCard />
              <ChatCard />
              <ChatCard />
              <ChatCard />
              <ChatCard />
              <ChatCard />
              <ChatCard />
              <ChatCard />
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div data-simplebar className="listChatCard">
              <ChatCard status />
            </div>
          </TabPanel>
        </Box>
      )}
    </div>
  );
};

export default ChatList;
