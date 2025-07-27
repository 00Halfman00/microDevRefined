import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    // Add data-scroll-behavior="smooth" directly to the Html component
    <Html lang="en" data-scroll-behavior="smooth">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
