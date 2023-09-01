export type Routes = {
    name: string;
    path: string;
    withParams?: boolean;
  };
  
  export const ROUTES: Routes[] = [
    { 
      name: "Home",
      path: "/" 
    },
    {
        name: "Group Topics",
        path: "/queries/groupTopics"
    },
    {
        name: "Group Admins",
        path: "/queries/groupAdmins",
    },
    { 
      name: "Group Roles", 
      path: "/queries/groupRoles", 
      withParams: true 
    },
    {
      name: "Common Groups",
      path: "/queries/commonGroups",
      withParams: true,
    },
    { 
      name: "Author Books", 
      path: "/queries/authorBooks", 
      withParams: true 
    },
    {
      name: "User Lists",
      path: "/queries/userLists",
      withParams: true,
    },
    {
      name: "User Challenges",
      path: "/queries/userChallenges",
      withParams: true,
    },
    {
      name: "User Followers",
      path: "/queries/userFollowers",
      withParams: true,
    },
    {
      name: "Insert Review",
      path: "/queries/insertReview",
      withParams: true,
    },
  ];