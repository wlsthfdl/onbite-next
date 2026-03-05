import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { BookData } from "@/types";

async function Footer() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_UPL}/book`,
    //book/page.tsx와 중복되는 코드지만,
    //request Memoization이 자동으로 동작하고 있기 떄문에 한 번만 요청
    //캐시는 서버 인스턴스가 살아있는 동안 지속되는 반면,
    //리퀘스트 메모이제이션은 페이지 렌더링이 완료되면 사라짐
  );
  if (!response.ok) {
    return <footer>제작 @winterlood</footer>;
  }

  const books: BookData[] = await response.json();
  const bookCnt = books.length;

  return (
    <footer>
      <div>제작 @winterlood</div>
      <div>{bookCnt}개의 도서가 등록되어 있습니다.</div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <Footer></Footer>
        </div>
      </body>
    </html>
  );
}
