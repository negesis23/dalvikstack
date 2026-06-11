const fmt = (s) => s.startsWith("$") ? s : `$${s}`;

export const V = {
  var: (name) => fmt(name),
  if: (cond) => `#if(${fmt(cond)})`,
  else: () => "#else",
  foreach: (item, list) => `#foreach(${fmt(item)} in ${fmt(list)})`,
  end: () => "#end"
};
