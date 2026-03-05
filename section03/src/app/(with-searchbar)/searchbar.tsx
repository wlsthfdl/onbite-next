"use client"; //클라이언트 컴포넌트 설정

import { useState } from "react";

//서치바 컴포넌트는 사용자의 입력을 받고 상호작용을 일으키는 컴포넌트이다. (클라이언트 컴포넌트)
export default function Searchbar() {
  const [search, setSearch] = useState("");

  //React.ChangeEvent<HTMLInputElement> ==> e의 타입, ts문법
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <input value={search} onChange={onChangeSearch}></input>
      <button>검색</button>
    </div>
  );
}
