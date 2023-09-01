import React, { useEffect, useState } from "react";
import ResultPage from "../../components/ResultPage";
import ResultTable from "../../components/ResultTable";
import { supabaseAdmin } from '../../db'

type AuthorBooksResult = {
    aid: number;
	author: string;
    genre_name: string;
    book_count: number;
}

const TableHeader: {[K in keyof AuthorBooksResult]: string} = {
  aid: "Author ID",
  author: "Author Name",
  genre_name: "Genre",
	book_count: "Number of Books",
};

export default function AuthorBook() {
  const [genre, setGenre] = useState('');
  const [fetched, setFetched] = useState([]);

  useEffect(() => {
    getData()
  }, [genre])

  const getData = async () => {
    let { data: fetched, error } = await supabaseAdmin.rpc('author_books', { genre: genre });
    console.log(fetched);
    
    if (error) {
      console.log('error', error)
    } else {
      {/* @ts-ignore */}
      setFetched(fetched)
    }
  }

  return (
    <ResultPage
      title="Author Books"
      description="Gets the number of books of a specific genre written by each author in which the user participated."
    >
      <div className="flex flex-col gap-4">
        <form>
          <div className="input-container">
            <label htmlFor="userId">Genre</label>
              <div className="flex flex-row gap-4">
              <input
                className="w-80"
                type="text"
                id="genre"
                name="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="Type a genre"
                required
              />
            </div>
          </div>
        </form>
        {/* @ts-ignore */}
        {<ResultTable data={fetched} headers={TableHeader} />}
      </div>
    </ResultPage>
  )
}
