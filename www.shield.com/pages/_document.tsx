import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class _Document extends Document {

  render() {
    return (
      <Html>
        <Head>
          <title>S.H.I.E.L.D. - PWA</title>
          <link
            rel="shortcut icon"
            href="alarm-clock.png"
            type="image/x-icon"
          />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}