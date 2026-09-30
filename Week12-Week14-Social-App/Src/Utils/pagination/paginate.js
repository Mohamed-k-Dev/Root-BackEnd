export const paginate = (documents = [], page = 1, limit = 10) => {
  page = Math.max(parseInt(page) || 1, 1);
  limit = Math.max(parseInt(limit) || 10, 1);

  const totalItems = documents.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;

  return {
    data: documents.slice(startIndex, startIndex + limit),
    pagination: {
      totalItems,
      totalPages,
      currentPage: page,
      limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};
