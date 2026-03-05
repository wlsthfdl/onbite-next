export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>; //q:"한입" 구조분해 + 타입선언
}) {
  const { q } = await searchParams;
  return <div>Search 페이지: {q}</div>;
}
