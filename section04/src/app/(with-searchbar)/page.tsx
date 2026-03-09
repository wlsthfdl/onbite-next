import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";

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
