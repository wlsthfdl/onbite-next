import { ReactNode, Suspense } from "react";
import Searchbar from "../../components/searchbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>{new Date().toLocaleString()}</div>
      <Suspense fallback={<div>Loading...</div>}>
        <Searchbar />
      </Suspense>
      {children}
      {/*Next.js 라우터가 자동으로 현재 경로의 page.tsx를 children으로 넣어줌*/}
    </div>
  );
}
