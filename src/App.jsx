
import { ChakraProvider, theme, Alert, AlertIcon, AlertDescription, Container, Box, AlertTitle, Button } from '@chakra-ui/react'
import { useState } from 'react';

function notifyUser(notificationText = "Thank you for enabling notifications!") {
  if (!("Notification" in window)) {
    alert("Browser does not support notifications");
  } else if (Notification.permission === "granted") {
    const notification = new Notification(notificationText);
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        const notification = new Notification(notificationText);
      }
    });
  }
}

function App() {
  const [userResponded, setUserResponded] = useState(false)

  const enableNotifsAndClose = () => {
    notifyUser();
    setUserResponded(true);
  }
  const disableNotifsAndClose = () => {
    setUserResponded(true);
  }

  return (!userResponded && !(Notification.permission === "granted")) ? (
    <ChakraProvider theme={theme}>
      <Container>
        <Alert status="success">
          <AlertIcon />
          <Box>
            <AlertTitle>Notifications</AlertTitle>
            <AlertDescription>
              Would you like to enable notifications?
            </AlertDescription>
          </Box>
          <Button colorScheme='teal' size='sm' onClick={enableNotifsAndClose}>
            Sure!
          </Button>
          <Button colorScheme='gray' size='sm' onClick={disableNotifsAndClose}>
            No thanks!
          </Button>
        </Alert>
      </Container>
    </ChakraProvider>
  ) : (Notification.permission === "granted") ? (
    <ChakraProvider theme={theme}>

    </ChakraProvider>
  ) : <>
    <h1>You have Disable Notification</h1>
  </>
}

export default App
