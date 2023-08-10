import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from 'pages/Router'
import { ThemeProvider } from 'styled-components'
import { theme } from 'styles/index'


ReactDOM.createRoot(document.getElementById('root')!).render(

    <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
    </ThemeProvider>

)



