import {
  Button,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  forwardRef,
} from '@chakra-ui/react';
import { createContext, useContext, useEffect, useState } from 'react';

console.log('Top-level executing');

const ToggleContext = createContext({ isOpen: false, toggle: () => {} });

const colorContextDefaultValue = { color: 'red' };

const ColorContext = createContext(colorContextDefaultValue);

function ColorContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <ColorContext.Provider value={colorContextDefaultValue}>
      {children}
    </ColorContext.Provider>
  );
}

function ToggleContextProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);
  return (
    <ToggleContext.Provider value={{ isOpen, toggle }}>
      {/* <ColorContextProvider>{children}</ColorContextProvider> */}
      {isOpen ? (
        <ColorContextProvider>{children}</ColorContextProvider>
      ) : (
        children
      )}
    </ToggleContext.Provider>
  );
}

export function Playground() {
  return (
    <Flex
      flexDirection="column"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      gap="32px"
    >
      <ToggleContextProvider>
        <ToggleButton />
        <CoolPopover key="cool-popover" />
      </ToggleContextProvider>
    </Flex>
  );
}

function CoolPopover() {
  const { isOpen } = useContext(ToggleContext);
  // useEffect(() => console.log('CoolPopover rendered'));
  useEffect(() => {
    // Runs on mount
    console.log('Component mounted');

    // Cleanup function runs on unmount
    return () => {
      console.log('Component unmounted');
    };
  }, []); // Empty dependency array ensures this runs once on mount and once on unmount

  return (
    <Popover isOpen={isOpen}>
      <PopoverContent>
        <PopoverBody>Content</PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

const ToggleButton = forwardRef(function ToggleButton() {
  const { toggle } = useContext(ToggleContext);
  return <Button onClick={toggle}>Toggle</Button>;
});
