import { createGlobalStyle } from 'styled-components'
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="main-height">
        <GlobalStyle />
        <main className="w-full">{children}</main>
      </div>
    </>
  )
}
