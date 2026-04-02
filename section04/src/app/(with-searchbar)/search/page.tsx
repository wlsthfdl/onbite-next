import { BookData } from "@/types";
import BookItem from "@/components/book-item";

// cache상태가 no-store(캐싱안함)이어도 강제로 캐싱하도록 static 페이지가 됨
// export const dynamic = "force-static";

//검색결과 페이지
export default async function Page({
  searchParams,
}: {
  searchParams: { q?: string }; //force-static일 경우, query string과 같은 동적함수의 값은 작동하지 않게됨
}) {
  //fetch 실행(요청) -> 서버 검색 -> JSON반환
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_UPL}/book/search?q=${searchParams.q}`,
    { cache: "force-cache" },
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
