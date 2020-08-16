import React from "react";
import { EuiIcon } from "@elastic/eui";

const routeList = [
  {
    path: "/",
    name: "Home",
    component: React.lazy(() => import("./containers/Home")),
    exact: true,
    icon: <EuiIcon type="home" />,
  },
  {
    path: "/tasks",
    name: "Tasks",
    component: React.lazy(() => import("./containers/Tasks")),
    exact: true,
    icon: <EuiIcon type="logoElasticsearch" />,
  },
];

export default routeList;
