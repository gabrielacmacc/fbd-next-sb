import React, { useEffect, useState } from "react";
import ResultPage from "../../components/ResultPage";
import ResultTable from "../../components/ResultTable";
import { supabaseAdmin } from '../../db'

type BookReviews = {
	u_id: number;
	b_id: string;
    rv_date: Date; 
    rat: number;
    comment: string;
}

const TableHeaderReviews: {[K in keyof BookReviews]: string} = {
	u_id: "User ID",
	b_id: "Book ID",
    rv_date: 'Review Date',
    rat: 'Rating',
    comment: 'Comment'
};

type Book = {
	bid: string;
	name: string;
    resume: string; 
    publish_date: Date;
    gl_rating: number;
}

const TableHeaderBooks: {[K in keyof Book]: string} = {
	bid: "Book ID",
    name: "Book Name",
    resume: "Book Resume",
    publish_date: "Publish Date",
    gl_rating: "Global Rating"
};

export default function InsertReviews() {
  const [uid, setUid] = useState(1);
  const [bid,setBid] = useState('');
  const [rating,setRating] = useState(0);
  const [comment,setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [newRating, setNewRating] = useState([]);
  const date = new Date();

  useEffect(() => {
    getData()
    getNewRating()
  }, [uid,bid,rating,comment])
  
  function formatDate() {
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(); 
  }

  const setData = async () => {
    const {data, error} = await supabaseAdmin.from('reviews').insert({uid: uid, bid: bid, review_date: formatDate(), rating: rating, review_comment: comment});
    if (error) alert(error.message);
    else alert("Workout created successfully");
  }

  const getData = async () => {
    let { data: reviews, error } = await supabaseAdmin.rpc('book_reviews', { book_id: bid });
    if (error) {
      console.log('error', error)
    } else {
      {/* @ts-ignore */}
      setReviews(reviews)
    }
  }

  const getNewRating = async () => {
    let { data: newRating, error } = await supabaseAdmin.from('books').select('*').eq('bid', bid);
    if (error) {
      console.log('error', error)
    } else {
      {/* @ts-ignore */}
      setNewRating(newRating)
    }
  }

  return (
    <ResultPage
      title="Insert Review"
      description="Inserts a book review to validate the trigger."
    >
      <div className="flex flex-col gap-4">
        <form className="flex flex-col justify-between gap-4" onSubmit={setData}>
          <div className="input-container">
            <label htmlFor="userId">User ID</label>
            <div className="flex flex-row gap-4">
              <input
                className="w-80"
                type="number"
                id="uid"
                name="uid"
                value={uid}
                onChange={(e) => setUid(+e.currentTarget.value)}
                min={1}
                max={20}
                placeholder="Type a user ID"
                required
              />
            </div>
          </div>
          <div className="input-container">
            <label htmlFor="productId">Book ID</label>
            <div className="flex flex-row gap-4">
              <input
                className="w-80"
                type="text"
                id="bid"
                name="bid"
                value={bid}
                onChange={(e) => setBid(e.currentTarget.value)}
                placeholder="Type a book ID"
                required
              />
            </div>
          </div>
          <div className="input-container">
            <label htmlFor="productId">Rating</label>
            <div className="flex flex-row gap-4">
              <input
                className="w-80"
                type="number"
                id="rating"
                name="rating"
                value={rating}
                onChange={(e) => setRating(+e.currentTarget.value)}
                min={1}
                max={5}
                placeholder="Rate the book"
                required
              />
            </div>
          </div>
          <div className="input-container">
            <label htmlFor="productId">Comment</label>
            <div className="flex flex-row gap-4">
              <input
                className="w-80"
                type="text"
                id="comment"
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.currentTarget.value)}
                placeholder="Write a comment"
              />
            </div>
          </div>
          <input
            className="button-fill bg-green-700 cursor-pointer"
            type="submit"
            value="Review"
          />
        </form>
        {/* @ts-ignore */}
        {<ResultTable data={reviews} headers={TableHeaderReviews} />}
        {/* @ts-ignore */}
        {<ResultTable data={newRating} headers={TableHeaderBooks} />}
      </div>
    </ResultPage>
  )
}
