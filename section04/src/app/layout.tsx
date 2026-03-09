import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { BookData } from "@/types";

async function Footer() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_UPL}/book`,
    { cache: "force-cache" },
    // 하나라도 다이나믹 페이지가 있으면 다른 페이지도 다이나믹 페이지가 됨. force-cache를 사용하면 정적페이지로써 사용가능
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
