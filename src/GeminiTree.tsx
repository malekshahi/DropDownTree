import React, { useState, useEffect } from 'react';
import { ControlledTreeEnvironment, Tree } from 'react-complex-tree';
import { createNodes } from './TreeNodeCreator';

function GeminiTree(props) {
  const [focusedItem, setFocusedItem] = useState();
  const [expandedItems, setExpandedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    if(props.getData && props.url){
      props.getData(props.url).then(data => {
        initilaize(data);})
    }
    else
      initilaize(props.data);
  }, []);

  const initilaize = (data: any) => {
    var all = createTree(data);
    setAllItems(all);
    setExpandedItems(getExpandingItmes(all, props.selectedItem));
    setSelectedItems(props.selectedItem ? [props.selectedItem.Key] : []);

  }
  const levels = props.levels;

  const createTree = (data) => {
    var nodes = createNodes(levels, data);
    var treeItems = {};
    for (const [key, node] of Object.entries(nodes)) {
      var item = {
        index: key,
        isFolder: true,
        children: getChildren(node),
        data: node,
      };
      treeItems[item.index] = item;
      addSubNodes(node, treeItems);
    }
    treeItems['root'] = {
      index: 'root',
      isFolder: true,
      children: getChildren(nodes),
      data: 'Root item',
    };
    return treeItems;
  };
  const addSubNodes = (node, treeItems) => {
    for (const [key, subNde] of Object.entries(node.SubNodes)) {
      var children = getChildren(subNde);
      var item = {
        index: key,
        isFolder: children.length > 0,
        children: children,
        data: subNde,
      };
      treeItems[item.index] = item;
      addSubNodes(subNde, treeItems);
    }
  };

  const getChildren = (node) => {
    return Object.entries(node.SubNodes ? node.SubNodes : node).map(([key, value]) => key);
  };
  const getTreeNode = (item) => {
    return item.data.Title + ' (' + item.data.Code + ')';
  };

  const onItemSelected = (items) => {
    if (props.onItemSelected) {
      props.onItemSelected(items.length > 0 ? allItems[items[0]].data : null);
    }
    setSelectedItems(items);
  };
  const getExpandingItmes = (all, selectedItem) => {
    var toExpanding = [];
    if (selectedItem) {
      var current = selectedItem.Key;
      while (current != null) {
        toExpanding.push(current);
        current = getItemWithChild(all, current);
      }
    }
    return toExpanding;
  };

  const getItemWithChild = (all, child) => {
    var keys = Object.entries(all)
      .filter(([key, value]) => value.children.includes(child))
      .map(([key, value]) => key);
    if (keys.length > 0) return keys[0];
    return null;
  };

  return (
    <ControlledTreeEnvironment<string>
      disableMultiselect
      items={allItems}
      getItemTitle={(item) => getTreeNode(item)}
      viewState={{
        ['GeminiTree']: {
          focusedItem,
          expandedItems,
          selectedItems,
        },
      }}
      onFocusItem={(item) => setFocusedItem(item.index)}
      onExpandItem={(item) => setExpandedItems([...expandedItems, item.index])}
      onCollapseItem={(item) =>
        setExpandedItems(
          expandedItems.filter((expandedItemIndex) => expandedItemIndex !== item.index)
        )
      }
      onSelectItems={(items) => onItemSelected(items)}
    >
      <Tree treeId="GeminiTree" rootItem="root" treeLabel="GeminiTree" />
    </ControlledTreeEnvironment>
  );
}
export default GeminiTree;
