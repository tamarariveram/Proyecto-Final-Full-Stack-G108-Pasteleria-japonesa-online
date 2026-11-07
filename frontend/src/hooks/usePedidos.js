import { useContext } from 'react'
import { PedidosContext } from '../context/PedidosContext'

export const usePedidos = () => useContext(PedidosContext)
