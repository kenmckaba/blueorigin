import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
})

export interface Alias {
  alias: string
  url: string
}

type ID = Pick<Alias, 'alias'>

export const insertAlias = (payload: Alias) => api.post('/alias', payload)
export const getAllAliases = () => api.get('/aliases')
export const updateAliasById = (id: ID, payload: Alias) =>
  api.put(`/alias/${id}`, payload)
export const deleteAliasById = (id: ID) => api.delete(`/alias/${id}`)
export const getAliasById = (id: ID) => api.get(`/alias/${id}`)

export const apis = {
  insertAlias,
  getAllAliases,
  updateAliasById,
  deleteAliasById,
  getAliasById,
}
