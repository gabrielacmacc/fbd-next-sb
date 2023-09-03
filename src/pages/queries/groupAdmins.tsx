import React, { useEffect, useState } from "react";
import ResultPage from "../../components/ResultPage";
import ResultTable from "../../components/ResultTable";
import { supabaseAdmin } from '../../db'

type GroupAdminResult = {
	username: string;
  group_name: string; 
  role: string;
}

const TableHeader: {[K in keyof GroupAdminResult]: string} = {
	username: "Username",
  group_name: "Group Name", 
  role: "User Role",
};

export default function GroupAdmins() {
  const [fetched, setFetched] = useState([]);

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    let { data: fetched, error } = await supabaseAdmin.rpc('group_admins');
    if (error) {
      console.log('error', error)
    } else {
      {/* @ts-ignore */}
      setFetched(fetched)
    }
  }

  return (
    <ResultPage
      title="Group Admins"
      description="Busca todos os usuários que possuem cargos administrativos em grupos e o nome desses grupos."
    >
      <div className="flex flex-col gap-4">
        {/* @ts-ignore */}
        {<ResultTable data={fetched} headers={TableHeader} />}
      </div>
    </ResultPage>
  )
}
