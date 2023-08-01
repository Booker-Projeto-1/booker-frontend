export const capitalizeWords = (str: string) => {
    if (!str) {
      throw new Error("A string fornecida está vazia.");
    }
  
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };