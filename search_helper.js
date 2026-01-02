export function searchTree(node, term, mode = "entry", matches = []) {
  if (!term) return matches;

  const entryMatch = node.key && node.key.includes(term);
  const valueMatch =
    node.value !== undefined &&
    String(node.value).includes(term);

  let matched = false;

  if (mode === "entry" && entryMatch) matched = true;
  else if (mode === "entryValue" && (entryMatch || valueMatch)) matched = true;
  else if (mode === "value" && valueMatch) matched = true;

  if (matched) matches.push(node.path.join("."));

  node.children?.forEach(c => searchTree(c, term, mode, matches));
  return matches;
}