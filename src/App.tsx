import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import { Playground } from "./Playground"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Playground />
  </ChakraProvider>
)
