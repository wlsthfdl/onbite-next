import style from "./review-editor.module.css";
import { createReviewAction } from "@/actions/create-review.action";

export function ReviewEditor({ bookId }: { bookId: string }) {
  return (
    <section>
      <form className={style.form_container} action={createReviewAction}>
        <input name="bookId" value={bookId} hidden readOnly></input>
        <textarea required name="content" placeholder="리뷰 내용"></textarea>
        <div className={style.submit_container}>
          <input required name="author" placeholder="작성자"></input>
          <button type="submit">작성하기</button>
        </div>
      </form>
    </section>
  );
}
