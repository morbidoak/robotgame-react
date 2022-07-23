export function addElement(elements, newElement) {
  if (elements.findIndex(({x, y}) => ((x===newElement.x) && (y===newElement.y))) >=0 ) return elements;
  
  return [...elements, newElement];
}

export function removeElement(elements, removeElement) { 
  return elements.filter(({x, y}) => ((x!==removeElement.x) || (y!==removeElement.y)));
}