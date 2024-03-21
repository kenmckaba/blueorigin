import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Main } from './components/Main'

const App = () => {
  return (
    <ChakraProvider>
      <Main />
    </ChakraProvider>
  )
}

export default App
