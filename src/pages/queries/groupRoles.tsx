import React, { useEffect, useState } from "react";
import ResultPage from "../../components/ResultPage";
import ResultTable from "../../components/ResultTable";
import { supabaseAdmin } from '../../db'

type GroupRolesResult = {
	group_name: string;
	user_count: number;
}

const TableHeader: {[K in keyof GroupRolesResult]: string} = {
	group_name: "Group Name",
	user_count: "User Count",
};

export default function GroupRoles() {
  const [amount, setAmount] = useState(1);
  const [fetched, setFetched] = useState([]);

  useEffect(() => {
    getData()
  }, [amount])

  const getData = async () => {
    let { data: fetched, error } = await supabaseAdmin.rpc('group_roles', { count: amount });
    if (error) {
      console.log('error', error)
    } else {
      {/* @ts-ignore */}
      setFetched(fetched)
    }
  }

  return (
    <ResultPage
      title="Group Roles"
      description="Gets all the groups that have less members than the specified amount."
    >
      <div className="flex flex-col gap-4">
        <form>
          <div className="input-container">
            <label htmlFor="userId">Members</label>
              <div className="flex flex-row gap-4">
              <input
                className="w-80"
                type="number"
                id="members"
                name="members"
                value={amount}
                onChange={(e) => setAmount(+e.target.value)}
                min={1}
                placeholder="Type an amount"
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
