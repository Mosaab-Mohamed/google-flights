import React, { useMemo } from 'react';
import { createTheme, ThemeProvider, useColorScheme } from '@mui/material/styles';

export default function Theme({ children }: { children: React.ReactNode }) {
  const { mode, setMode } = useColorScheme();

  const theme = createTheme({

    colorSchemes: {
      light: true,
    },
  });

  console.log(mode)
  return (
    <ThemeProvider theme={theme}>
      <button onClick={() => setMode('light')}>light</button>
      <button onClick={() => setMode('dark')}>dark</button>
      {children}
    </ThemeProvider>
  )
}
