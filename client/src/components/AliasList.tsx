import {
  Box,
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  Center,
  Text,
} from '@chakra-ui/react'
import { Alias, getAllAliases } from '../api'
import { useEffect, useState } from 'react'

const AliasList: React.FC = () => {
  const [aliases, setAliases] = useState([] as Alias[])

  useEffect(() => {
    const getAll = async () => {
      try {
        const list = await getAllAliases()
        console.log('@ken aliases', list)
        setAliases(list.data.data as Alias[])
      } catch (error) {
        console.error('@ken getAllAliases failed', error)
      }
    }
    getAll()
  }, [])

  return (
    <Box border="1">
      <Center>
        <Text fontWeight="bold">Stored aliases</Text>
      </Center>
      <Table size="sm" variant="striped">
        <Thead>
          <Tr>
            <Th pb="0">Alias</Th>
            <Th pb="0">URL</Th>
          </Tr>
        </Thead>
        <Tbody>
          {aliases?.map((alias) => {
            return (
              <Tr key={alias.alias}>
                <Td>{alias.alias}</Td>
                <Td>{alias.url}</Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </Box>
  )
}

export default AliasList
