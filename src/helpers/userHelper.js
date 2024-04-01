/**
 *
 * @param {string} name
 */
export const getShortname = (name) => {
  if (!name) return '';
  name = name.toUpperCase();
  let array = name.split(' ');
  if (name.length === 2 || array.length === 1) return name[0];
  let res =
    array[array.length - 2].charAt(0) + array[array.length - 1].charAt(0);
  return res;
};
