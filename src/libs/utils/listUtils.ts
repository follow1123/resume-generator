export function remove<T>(list: T[], index: number): T[] {
  return list.filter((_, i) => i !== index);
}

export function swap<T>(list: T[], index: number, swapOffset: number): T[] {
  const targetIdx = index + swapOffset;
  if (targetIdx < 0 || targetIdx >= list.length) {
    throw new Error(`invalid offset: ${swapOffset}, index: ${index}`);
  }
  const newData = [...list];
  [newData[targetIdx], newData[index]] = [newData[index], newData[targetIdx]];
  return newData;
}
