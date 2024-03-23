import React, { useState } from 'react'
import {
  Button,
  HStack,
  Heading,
  Image,
  Input,
  Link,
  Text,
  Tooltip,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { CopyIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { insertAlias } from '../api'
import { AxiosError } from 'axios'
import AliasList from './AliasList'

const shortUrlPrefix = 'https://short.ly/'
const doGraphic =
  'https://assets-global.website-files.com/64ffef42eee54e27584ac09e/650038eb1e9e2e864a2118aa_logo%20v2.svg'
const doWebsiteUrl = 'https://deeporigin.com/'

export const Main = () => {
  const [urlToShorten, setUrlToShorten] = useState('')
  const [slug, setSlug] = useState('')
  const [destinationUrl, setDestinationUrl] = useState('')
  const [slugToUse, setSlugToUse] = useState('')
  const [aliasListKey, setAliasListKey] = useState(0)

  const refreshAliasList = () => {
    setAliasListKey((prev) => prev + 1)
  }

  const saveAliasToClipboard = async () => {
    await navigator.clipboard.writeText(shortUrlPrefix + slugToUse)
  }

  const saveUrlToClipboard = async () => {
    await navigator.clipboard.writeText(destinationUrl)
  }

  const launchOrignalUrl = () => {
    window.open(destinationUrl, 'DeepOriginUrlShortenerWindow')
  }

  const onChangeUrlToShorten = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrlToShorten(event.currentTarget.value || '')
  }

  const onChangeSlug = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(event.currentTarget.value || '')
  }

  const toast = useToast()

  const doShorten = async () => {
    try {
      const result = await insertAlias({ alias: slug, url: urlToShorten })
      console.log('@ken insertAlias result', result)
      refreshAliasList()
      toast({
        title: 'Alias saved',
        description: 'Your alias has been saved',
        duration: 3000,
        status: 'success',
        isClosable: true,
      })
    } catch (error) {
      console.error('@ken insertAlias failed', slug, urlToShorten, error)
      let message = 'Error saving alias'
      if (error instanceof AxiosError) {
        message = error.message
      }
      toast({
        title: 'Error saving alias',
        description: message,
        duration: 10000,
        status: 'error',
        isClosable: true,
      })
    }
    setDestinationUrl('http://' + urlToShorten)
    setSlugToUse(slug)
    setUrlToShorten('')
    setSlug('')
  }

  return (
    <VStack
      width={400}
      margin="auto"
      padding="10"
      border="1px"
      borderRadius="20"
    >
      <Image
        src={doGraphic}
        alt="DeepOrigin logo"
        width="200px"
        height="auto"
        cursor="pointer"
        onClick={() => window.open(doWebsiteUrl, '_blank')}
      />
      <Heading>URL Shortener</Heading>
      <Input
        variant="filled"
        type="text"
        value={urlToShorten}
        placeholder="URL to shorten"
        onChange={onChangeUrlToShorten}
      />
      <Input
        variant="filled"
        type="text"
        value={slug}
        placeholder="Slug to use"
        onChange={onChangeSlug}
      />
      <Button
        colorScheme="blue"
        alignSelf="end"
        onClick={doShorten}
        isDisabled={urlToShorten.length === 0 || slug.length === 0}
      >
        Shorten
      </Button>
      {destinationUrl?.length > 0 && slugToUse?.length && (
        <>
          <Text fontWeight="bold">Success!</Text>
          <HStack>
            <Link href={destinationUrl}>
              {shortUrlPrefix}
              {slugToUse}
            </Link>
            <Tooltip label="Copy to clipboard">
              <CopyIcon boxSize={4} onClick={saveAliasToClipboard} />
            </Tooltip>
          </HStack>
          <Text fontWeight="bold">Redirects to:</Text>
          <HStack>
            <Link href={destinationUrl}>{destinationUrl}</Link>
            <>
              <Tooltip label="Copy to clipboard">
                <CopyIcon boxSize={4} onClick={saveUrlToClipboard} />
              </Tooltip>
              <Tooltip label="Launch">
                <ExternalLinkIcon boxSize={4} onClick={launchOrignalUrl} />
              </Tooltip>
            </>
          </HStack>
        </>
      )}
      <AliasList key={aliasListKey} />
    </VStack>
  )
}
