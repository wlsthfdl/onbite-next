"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function createReviewAction(formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!bookId || !content || !author) return;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      { method: "POST", body: JSON.stringify({ bookId, content, author }) },
    );
    console.log(response.status);

    /** 
     * revalidatePath
    : revalidatePath는 /book/${bookId} 페이지에 해당하는 캐시를 무효화
      다음에 누가 그 페이지를 요청하면 서버에서 다시 fetch+렌더링됨
    */
    // 1. 특정 주소의 해당하는 페이지만 재검증
    // revalidatePath(`/book/${bookId}`);

    // 2. 특정 경로의 모든 동적 페이지를 재검증
    // revalidatePath("/book/[id]", "page");

    // 3. 특정 레이아웃을 갖는 모든 페이지를 재검증
    // revalidatePath("/(with-searchbar)", "layout");

    // 4. 모든 데이터를 재검증
    // revalidatePath("/", "layout");

    // 5. 태그 기준, 데이터 캐시 재검증
    revalidateTag(`review-${bookId}`); //페이지 전체가 아닌, 특정 fetch만 무효화
  } catch (err) {
    console.error(err);
  }
}
