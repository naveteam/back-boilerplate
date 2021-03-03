export const getPagination = ({ page = 1, pageSize = 10 }) => ({
  page: page - 1,
  pageSize,
  calculatePageCount: total => Math.ceil(total / pageSize)
})
