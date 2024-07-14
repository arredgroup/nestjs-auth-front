import { useState } from "react"

export const useUsuarios = (defaultUsuarios = []) => {
  const [usuarios, setUsuarios] = useState(defaultUsuarios)
  const areValid = usuarios.every(({name, email, cellphone, password}) => name && email && cellphone && password)
  const addUsuario = () => {
    setUsuarios(usuarios.concat({name: '', email: '', cellphone: '', password: ''}))
  }
  const deleteUsuario = (index) => {
    setUsuarios(usuarios.filter((_, i) => i !== index))
  }
  const editUsuario = (index, newData) => {
    setUsuarios(usuarios.map((usuario, i) => i === index ? {...usuario, ...newData} : usuario))
  }
  const clean = () => {
    setUsuarios([])
  }
  return {usuarios, addUsuario, deleteUsuario, areValid, editUsuario, clean}
}