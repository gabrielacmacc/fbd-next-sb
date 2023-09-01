import React, { useEffect, useState } from "react";
import ResultPage from "../../components/ResultPage";
import ResultTable from "../../components/ResultTable";
import { supabaseAdmin } from '../../db'

type UserChallengeResult = {
	uid: number;
	username: string;
  name: string;
}

const TableHeader: {[K in keyof UserChallengeResult]: string} = {
	uid: "User ID",
	username: "Username",
	name: "Challenge",
};

export default function UserChallenge() {
  const [username, setUsername] = useState('');
  const [fetched, setFetched] = useState([]);

  useEffect(() => {
    getData()
  }, [username])

  const getData = async () => {
    let { data: fetched, error } = await supabaseAdmin.rpc('user_challenges', { u_name: username });
    if (error) {
      console.log('error', error)
    } else {
      {/* @ts-ignore */}
      setFetched(fetched)
    }
  }

  return (
    <ResultPage
      title="User Challenges"
      description="Gets all the challenges in which the user participated."
    >
      <div className="flex flex-col gap-4">
        <form>
          <div className="input-container">
            <label htmlFor="userId">Username</label>
              <div className="flex flex-row gap-4">
              <input
                className="w-80"
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Type a username"
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
