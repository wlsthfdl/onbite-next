"use server";

import { revalidatePath } from "next/cache";

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
    revalidatePath(`/book/${bookId}`);
    //revalidatePath는 /book/${bookId} 페이지에 해당하는 캐시를 무효화
    //다음에 누가 그 페이지를 요청하면 서버에서 다시 fetch+렌더링됨
  } catch (err) {
    console.error(err);
  }
}
