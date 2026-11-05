import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/store'
import App from './App'
import '@mantine/core/styles.css'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <MantineProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </MantineProvider>
        </Provider>
    </React.StrictMode>,
)