import { Tree, TreeDataNode, TreeProps } from "antd";
import { FC, useState } from "react";
import { treeData as defaultTreeData } from "../../fakeData/treeData";
import { EventDataNode } from "antd/es/tree";

const AntdTree: FC = () => {
    const [treeData, setTreeData] = useState<TreeDataNode[]>(defaultTreeData);

    const handleDragEnter: TreeProps['onDragEnter'] = (info) => {
        // console.log(info);
    };

    const handleDrop: TreeProps['onDrop'] = (info) => {
        console.log(info);
        const dragNode = info.dragNode;
        const dropNode = info.node;
        const dropPosition = info.dropPosition;
        const dropToGap = info.dropToGap;

        let newTreeData = [...treeData];
        removeNode(newTreeData, dragNode);
        newTreeData = insertNode(newTreeData, dragNode, dropNode, dropPosition, dropToGap, undefined);
        setTreeData(newTreeData);
    }

    const removeNode = (treeData: TreeDataNode[], removedNode: TreeDataNode) => {
        treeData.forEach((data, index) => {
            if (data.key === removedNode.key) {
                treeData.splice(index, 1);
                return;
            }
            if (data.children) {
                removeNode(data.children, removedNode);
            }
        });
    }

    const insertNode = (treeData: TreeDataNode[], dragNode: EventDataNode<TreeDataNode>, dropNode: EventDataNode<TreeDataNode>, dropPosition: number, dropToGap: boolean, parent: TreeDataNode | undefined) => {
        const dropPos = dropNode.pos.split("-");
        const newPosition = dropPosition - Number(dropPos[dropPos.length - 1]);

        for (let data of treeData) {
            if (data.key === dropNode.key) {
                if (dropToGap) {
                    if (newPosition === -1) {
                        treeData.splice(0, 0, dragNode);
                    } else {
                        treeData.splice(dropPosition, 0, dragNode);
                    }
                    return treeData;
                } else {
                    // insert into children
                    const children = data.children ?? [];
                    children.unshift(dragNode);
                    data.children = children;
                    return treeData;
                }
            } else {
                if (data.children) {
                    data.children = insertNode(data.children, dragNode, dropNode, dropPosition, dropToGap, data);
                }
            }
        }
        return treeData;
    }

    return (
        <Tree 
            treeData={treeData}
            draggable
            onDragEnter={handleDragEnter}
            onDrop={handleDrop}/>
    )
}

export default AntdTree;