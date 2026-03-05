import { BookData } from "@/types";
import BookItem from "@/components/book-item";

//검색결과 페이지
export default async function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  //fetch 실행(요청) -> 서버 검색 -> JSON반환
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_UPL}/book/search?q=${searchParams.q}`,
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다..</div>;
  }

  //JSON화면 렌더
  const books: BookData[] = await response.json();

  //화면 출력
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
