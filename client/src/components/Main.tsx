import React, { useState } from 'react'
import {
  Button,
  ChakraProvider,
  HStack,
  Heading,
  Image,
  Input,
  Link,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import { CopyIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { insertAlias } from '../api'

const shortUrlPrefix = 'https://short.ly/'
const doGraphic =
  'https://assets-global.website-files.com/64ffef42eee54e27584ac09e/650038eb1e9e2e864a2118aa_logo%20v2.svg'
const doWebsiteUrl = 'https://deeporigin.com/'

export const Main = () => {
  const [urlToShorten, setUrlToShorten] = useState('')
  const [slug, setSlug] = useState('')
  const [destinationUrl, setDestinationUrl] = useState('')
  const [slugToUse, setSlugToUse] = useState('')

  const saveShortToClipboard = async () => {
    await navigator.clipboard.writeText(shortUrlPrefix + slugToUse)
  }

  const saveOriginalToClipboard = async () => {
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

  const doShorten = async () => {
    const result = await insertAlias({ alias: slug, url: urlToShorten })
    console.log('@ken insertAlias result', result)
    setDestinationUrl('http://' + urlToShorten)
    setSlugToUse(slug)
    setUrlToShorten('')
    setSlug('')
  }

  return (
    <ChakraProvider>
      <VStack
        width={400}
        margin="auto"
        padding="10"
        border="1px"
        borderRadius="20"
        height=""
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
                <CopyIcon boxSize={4} onClick={saveShortToClipboard} />
              </Tooltip>
            </HStack>
            <Text fontWeight="bold">Redirects to:</Text>
            <HStack>
              <Link href={destinationUrl}>{destinationUrl}</Link>
              <>
                <Tooltip label="Copy to clipboard">
                  <CopyIcon boxSize={4} onClick={saveOriginalToClipboard} />
                </Tooltip>
                <Tooltip label="Launch">
                  <ExternalLinkIcon boxSize={4} onClick={launchOrignalUrl} />
                </Tooltip>
              </>
            </HStack>
          </>
        )}
      </VStack>
    </ChakraProvider>
  )
}
