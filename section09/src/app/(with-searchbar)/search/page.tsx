import { BookData } from "@/types";
import BookItem from "@/components/book-item";
import { delay } from "@/util/delay";
import { Suspense } from "react";
import { Metadata } from "next";

async function SearchjResult({ q }: { q: string }) {
  await delay(1500); //1.5초 딜레이
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
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

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;

  return {
    title: `${q}: 한입북스 검색`,
    description: `${q}의 검색 결과입니다`,
    openGraph: {
      title: `${q}: 한입북스 검색`,
      description: `${q}의 검색 결과입니다`,
      images: ["/thumbnail.png"],
    },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
    <Suspense key={q || ""} fallback={<div>loading...</div>}>
      <SearchjResult q={q || ""}></SearchjResult>
    </Suspense>
  );
}
