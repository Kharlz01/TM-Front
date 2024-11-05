import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App';

function render(): void {
  const rootElement = document.getElementById('root');

  const root = createRoot(rootElement!);
  root.render(
    <StrictMode>
      <App/>
    </StrictMode>
  )
}

render();