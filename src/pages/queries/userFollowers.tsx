import React, { useEffect, useState } from "react";
import ResultPage from "../../components/ResultPage";
import ResultTable from "../../components/ResultTable";
import { supabaseAdmin } from '../../db'

type UserFollowerResult = {
	follower: string;
}

const TableHeader: {[K in keyof UserFollowerResult]: string} = {
	follower: "Username",
};

export default function UserFollower() {
  const [uid, setUid] = useState(1);
  const [fetched, setFetched] = useState([]);

  useEffect(() => {
    getData()
  }, [uid])

  const getData = async () => {
    let { data: fetched, error } = await supabaseAdmin.rpc('user_followers', { u_id: uid });
    if (error) {
      console.log('error', error)
    } else {
      {/* @ts-ignore */}
      setFetched(fetched)
    }
  }

  return (
    <ResultPage
      title="User Followers"
      description="Busca todos usuários que o usuário especificado segue."
    >
      <div className="flex flex-col gap-4">
        <form>
          <div className="input-container">
            <label htmlFor="userId">User ID</label>
              <div className="flex flex-row gap-4">
              <input
                className="w-80"
                type="number"
                id="uid"
                name="uid"
                value={uid}
                onChange={(e) => setUid(+e.target.value)}
                min={1}
                max={20}
                placeholder="Indique um user ID"
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
