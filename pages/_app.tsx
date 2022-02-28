import type { AppProps } from 'next/app'
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import 'tailwindcss/tailwind.css';

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
`

const theme = {
  colors: {
    primary: '#0070f3'
  }
}

function App({ Component, pageProps }: AppProps) {
  return (<>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
      </>
    
  )
}

export default App