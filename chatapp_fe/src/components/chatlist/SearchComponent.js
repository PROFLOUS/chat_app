import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { MdPersonAddAlt } from "react-icons/md";
import { BsPeople } from "react-icons/bs";

import "./SearchComponentStyle.scss";
import React, { useRef, useState } from "react";
import Context from "../../store/Context";
import {
  SetLoadingSearchFunc,
  SetSearchingStatus,
  SetShowTabHistorySearch,
  SetUserSearched,
} from "../../store/Actions";
import UserService from "../../services/UserService";
const SearchComponent = () => {
  const groupSearchRef = useRef();
  const [active, setActive] = useState(false);
  const [searchText, setSerachText] = useState("");

  const { state, depatch } = React.useContext(Context);
  //detructering...
  const { showTabHistorySearch, userSearched, searchingStatus } = state;

  const handleOnClick = (e) => {
    //add clss active
    groupSearchRef.current.classList.add("active");
    setActive(true);
    depatch(SetShowTabHistorySearch(true));
  };

  // const handleBlur = () => {
  //   groupSearchRef.current.classList.remove("active");
  //   setActive(false);
  //   depatch(SetShowTabHistorySearch(false));
  // };

  const handleClose = () => {
    groupSearchRef.current.classList.remove("active");
    setActive(false);
    depatch(SetShowTabHistorySearch(false));
    setSerachText("");
    depatch(SetLoadingSearchFunc(true));
    depatch(SetUserSearched(null));
    depatch(SetSearchingStatus(false));
  };

  //search func
  const handleSearch = (e) => {
    setSerachText(e.target.value.trim());

    //get key search
    const text = e.target.value.trim();

    //check isGmail
    // let res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // if (res.test(text)) {
    //   //search by email

    //   UserService.getUserByEmail(text)
    //     .then((querySnapshot) => {
    //       querySnapshot.forEach((doc) => {
    //         //console.log(doc.data());
    //         depatch(SetUserSearched(doc.data()));
    //       });
    //     })
    //     .catch((error) => {
    //       console.log("Error getting documents: ", error);
    //     });
    // } else {
    //   depatch(SetUserSearched(null));
    // }

    // is searching => set status search
    depatch(SetSearchingStatus(true));

    //loading component show
    depatch(SetLoadingSearchFunc(true));
    UserService.getUserByEmail(text)
      .then((querySnapshot) => {
        depatch(SetLoadingSearchFunc(false));

        //neu khong tim thay user can tim va userSearched != null
        //=> set userSearched = null
        if (querySnapshot.empty && userSearched) {
          depatch(SetUserSearched(null));
        }
        querySnapshot.forEach((doc) => {
          depatch(SetUserSearched(doc.data()));
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  //delete text in input search
  const handleDelete = (e) => {
    setSerachText("");

    depatch(SetUserSearched(null));
    depatch(SetSearchingStatus(false));
  };

  return (
    <form className="form_search">
      <div className="group_input" ref={groupSearchRef}>
        <span>
          <AiOutlineSearch />
        </span>
        <input
          placeholder="Tìm kiếm"
          type="text"
          value={searchText}
          onFocus={(e) => handleOnClick(e)}
          // onBlur={(e) => handleBlur(e)}
          onChange={(e) => handleSearch(e)}
        />

        <span
          className={`${
            searchText.length ? "iconDelete ative_delete" : "iconDelete"
          }`}
          onClick={(e) => handleDelete(e)}
        >
          <MdOutlineCancel />
        </span>
      </div>

      {active ? (
        <span className="closeSearch" onClick={(e) => handleClose(e)}>
          Đóng
        </span>
      ) : (
        <React.Fragment>
          <span className="icon">
            <MdPersonAddAlt />
          </span>
          <span className="icon">
            <BsPeople />
          </span>
        </React.Fragment>
      )}
    </form>
  );
};

export default SearchComponent;
