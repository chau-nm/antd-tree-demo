import { FC, useState } from "react";
import AntdTree from "./components/AntdTree";
import { TreeDataNode } from "antd";
import { treeData as defaultTreeData } from "./fakeData/treeData";

const App: FC = () => {
  const [treeData, setTreeData] = useState<TreeDataNode[]>(defaultTreeData);

  return (
    <div id="app" style={{ padding: 20 }}>
      <AntdTree 
        treeData={treeData}
        setTreeData={setTreeData}
      />
    </div>
  )
}
export default App;
