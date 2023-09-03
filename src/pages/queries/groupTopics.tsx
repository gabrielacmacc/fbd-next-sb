import React, { useEffect, useState } from "react";
import ResultPage from "../../components/ResultPage";
import ResultTable from "../../components/ResultTable";
import { supabaseAdmin } from '../../db'

type GroupTopicResult = {
	group_name: string;
  topic_title: string; 
  comment: string; 
  user_name: string;
  com_date: Date;
}

const TableHeader: {[K in keyof GroupTopicResult]: string} = {
	group_name: "Group Name",
    topic_title: "Topic Title", 
    comment: "Topic Comment",
    user_name: "Commentator",
    com_date: "Comment Publish Date",
};

export default function GroupTopics() {
  const [fetched, setFetched] = useState([]);

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    let { data: fetched, error } = await supabaseAdmin.rpc('group_topics');
    if (error) {
      console.log('error', error)
    } else {
      {/* @ts-ignore */}
      setFetched(fetched)
    }
  }

  return (
    <ResultPage
      title="Group Topics"
      description="Busca todos os tópicos e comentários para cada grupo."
    >
      <div className="flex flex-col gap-4">
        {/* @ts-ignore */}
        {<ResultTable data={fetched} headers={TableHeader} />}
      </div>
    </ResultPage>
  )
}
