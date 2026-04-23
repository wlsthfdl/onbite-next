import { useRouter } from "next/router";

/** [...id]를 catch all segment로 설정해주면
 *  http://localhost:3000/book/1/123/123/123/123 하더라도
 *  url 파라미터로써 사용할 수 있다
 * */

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  return <h1>book {id}</h1>;
}
