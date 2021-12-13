import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { requestLogout } from "../../actions/auth";
import TopMenu from "../TopMenu/TopmenuWrap";

interface ChartsPageTypes {}

const ChartsPage: React.FC<ChartsPageTypes> = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <TopMenu activeEl={"charts"} />
      уцкуцуцк Здесь будет страница чартов
      <br />
      <br />
      sdafadsfdssadsadfa
    </div>
  );
};

export default ChartsPage;
