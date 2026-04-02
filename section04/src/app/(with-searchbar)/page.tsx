import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";

// 특정 페이지 유형을 강제로 static, Dynamic 페이지로 설정
// 1. auto: 기본값, 아무것도 강제하지 않음
// 2. force-dynamic: 페이지를 강제로 다이나믹 페이지로 설정
// 3. force-static: 페이지를 강제로 static 페이지로 설정
// 4. error: 페이지를 강제로 static 페이지로 설정(설정하면 안되는 이유가 있다면 error 발생)
export const dynamic = "force-dynamic";

//등록된 모든 문서
async function AllBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_UPL}/book`,
    { cache: "force-cache" }, //캐시 안됨(nest 15버전부터 기본은 캐시안되는 걸로 바뀜)
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다..</div>;
  }
  const allBooks: BookData[] = await response.json();

  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book}></BookItem>
      ))}
    </div>
  );
}

//지금 추천하는 도서
async function RecoBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_UPL}/book/random`,
    //{ cache: "force-cache" }, //무조건 캐싱
    { next: { revalidate: 3 } }, //3초마다 캐싱(자동 revalidate)
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다..</div>;
  }
  const recoBooks: BookData[] = await response.json();

  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book}></BookItem>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <RecoBooks />
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <AllBooks />
      </section>
    </div>
  );
}
