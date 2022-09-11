import React, { useEffect, useState } from "react";
import UserSearchedService from "../../services/UserSearchedService";
import UserService from "../../services/UserService";
import Contex from "../../store/Context";
import ChatCard from "./ChatCard";
import "./ChatListStyle.scss";
import "./SearchListStyle.scss";
import UserSearchCard from "./UserSearchCard";

import Skeleton from "@mui/material/Skeleton";
import { SetLoadingSearchFunc } from "../../store/Actions";

import { FcSearch } from "react-icons/fc";

import searchIcon from "../../images/searchIcon.png";

const SearchList = () => {
  const { state, depatch } = React.useContext(Contex);
  //detructering...
  const { user, userSearched, loadingSearchFunc, searchingStatus } = state;

  const [listUser, setListUser] = useState([]);
  const [loading, setLoading] = useState(true);

  //get list user was searched
  useEffect(() => {
    UserSearchedService.getById(user.uid).then(function (snapshot) {
      // console.log("d" + snapshot.data().first_name);
      const { users } = snapshot.data();
      // console.log(users);
      setListUser(users);

      depatch(SetLoadingSearchFunc(false));
    });

    if (listUser.length === 0) {
      depatch(SetLoadingSearchFunc(false));
    }
  }, []);

  return (
    <div className="search_list">
      {loadingSearchFunc ? (
        <div style={{ padding: "1rem" }}>
          {" "}
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </div>
      ) : (
        <div className="listChatCard">
          {searchingStatus ? (
            userSearched ? (
              <>
                <p>Tìm kiếm bằng gmail: </p>
                <UserSearchCard u={userSearched} />
              </>
            ) : (
              <div className="blockNotResult">
                <img src={searchIcon} />
                <p>
                  không tìm thấy kết quả <br /> vui lòng thử lại từ khóa khác
                </p>
              </div>
            )
          ) : (
            <React.Fragment>
              <p>Tìm kiếm gần đây</p>
              {listUser.length != 0 ? (
                listUser.map((u) => {
                  return <UserSearchCard u={u} />;
                })
              ) : (
                <p style={{ fontWeight: "500" }}>
                  Không có tìm kiếm nào gần đây
                </p>
              )}
            </React.Fragment>
          )}
        </div>
      )}
    </div>
  );
};
export default SearchList;
