export const parseTags = (tags) => {
  if (typeof tags === "string") {
    try {
      tags = JSON.parse(tags); 
    } catch {
      tags = [tags];
    }
  }

  return Array.isArray(tags) ? tags : [tags];
};
