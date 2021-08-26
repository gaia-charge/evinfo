import App from './components/App.svelte'
import CordovaDesktopShim from '../test/CordovaDesktopShim'

const app = new App({
	target: document.body
})

export default app
