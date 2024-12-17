
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <link rel="icon" href="/photos/logo.jpg" type="image/png" />
      </Head>
      <body>
      <div style={{overflowX:'hidden'}}>
        <Main />
      </div>
      <NextScript />
      </body>
    </Html>
  )
}
