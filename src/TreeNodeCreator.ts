export const createNodes = (levels, items) => {
  var nodesDic = {};
  items.forEach((item) => {
    var previousLevels: string[] = [];
    levels.forEach((level: string) => {
      addNode(nodesDic, previousLevels, level, item);
      previousLevels.push(level);
    });
  });
  return nodesDic;
};

export const addNode = (nodesDic, previousLevels, level, item) => {
  var parentNode = nodesDic;
  previousLevels.forEach((pl) => {
    var key = pl + item[pl + 'ID'];
    parentNode = getSubNode(parentNode)[key];
  });
  var newKey = level + item[level + 'ID'];
  if (!getSubNode(parentNode)[newKey]) {
    getSubNode(parentNode)[newKey] = {
      ID: item[level + 'ID'],
      Code: item[level + 'Code'],
      Title: item[level + 'Title'],
      Level: level,
      Key: newKey,
      SubNodes: {},
    };
  }
};

export const getSubNode = (parentNode) => {
  if (parentNode.SubNodes) return parentNode.SubNodes;
  return parentNode;
};
