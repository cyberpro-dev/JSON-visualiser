export function buildTree(data, depth = 0, path = []) {
  const type = Array.isArray(data)
    ? "array"
    : data === null
    ? "null"
    : typeof data;

  const node = {
    type,
    depth,
    path,
    children: [],
    valueType: type,
    value: data,
  };

  if (type === "object") {
    for (const key in data) {
      node.children.push({
        key,
        ...buildTree(data[key], depth + 1, [...path, key]),
      });
    }
  }

  if (type === "array") {
    data.forEach((item, i) => {
      node.children.push({
        key: `[${i}]`,
        ...buildTree(item, depth + 1, [...path, i]),
      });
    });
    node.length = data.length;
  }

  return node;
}

export function maxDepth(node) {
  if (!node.children.length) return node.depth;
  return Math.max(...node.children.map(maxDepth));
}