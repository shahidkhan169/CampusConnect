export function toCamelCase(str) {
  return str
    .replace(/[^a-zA-Z0-9 ]/g, '')       
    .split(' ')                          
    .map((word, index) => {
      if (index === 0) return word.toLowerCase(); 
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');
}