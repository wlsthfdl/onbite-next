"use client"; //클라이언트 컴포넌트 설정

/** 서버 컴포넌트 주의사항
 * 1. 서버컴포넌트에는 브라우저에서 실행될 코드가 포함되면 안됨
 * 2. 클라이언트 컴포넌트는 클라이언트에서만 실행되지 않는다.(서버, 브라우저에서 한번씩 실행됨)
 * 3. 클라이언트 컴포넌트에서는 서버 컴포넌트를 import할 수 없다. (서버컴포넌트는 오직 서버에서만 실행됨)
 *      할거면 home에서 <ClientCom>
 *                      <ServerCom>
 *                     <ClientCom>
 *      {children} props로 넘겨라
 * 4. 서버 컴포넌트에서 클라이언트 컴포넌트에게 직렬화(JSON형태)되지 않는 props는 전달 불가(함수,Date() 같은것들 안됨)
 */

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
