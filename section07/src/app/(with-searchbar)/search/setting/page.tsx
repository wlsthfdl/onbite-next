import { delay } from "@/util/delay";

//하위 폴더(setting)에 있는 페이지들도 스트리밍(loaging.tsx) 적용
//async가 없을 경우에는 적용되지 않음
export default async function Page() {
  await delay(2000);
  return <div>setting page</div>;
}
