export const V = {
  var: (name) => `$${name}`,
  if: (cond) => `#if(${cond})`,
  else: () => "#else",
  foreach: (item, list) => `#foreach($${item} in $${list})`,
  end: () => "#end"
};
