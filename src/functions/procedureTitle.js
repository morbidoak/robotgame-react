export function checkProcedureTitle(procedures, newTitle) {
  if (newTitle==="") return false;
  if (procedures.findIndex(({ title }) => (title === newTitle)) >= 0) return false;
  return true;
}

export function newProcedureTitle(procedures, baseTitle) {
  let i = 1;
  while (!checkProcedureTitle(procedures, `${baseTitle} ${i}`)) i++;
  return `${baseTitle} ${i}`;
}