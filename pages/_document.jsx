import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="hy">
        <Head>
            <link rel="icon" href="/logo.png" type="image/png" />
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
