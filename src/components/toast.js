import Toast from './Toast.tsx';
import { render } from 'react-dom';

export const toast = {
  currentToast: false,
  timeout: null,
  
  remove: () => {
    unmountComponentAtNode(document.getElementById("toast-container"))
    toast.currentToast = false
    if (toast.timeout) {
      clearTimeout(toast.timeout)
      toast.timeout = null
    }
  },

  add: (message, options = null) => {
    let duration = 5
    let color

    if (options) {
      if (options.duration) {
        duration = options.duration
      }
  
      if (options.type === "info") {
        color = "blue"
      }
  
      if (options.type === "success") {
        color = "green"
      }
  
      if (options.type === "error") {
        color = "red"
      }
  
      if (options.type === "warn") {
        color = "orange"
      }
    }

    if (toast.currentToast) {
      toast.remove()
    }

    let transitionPercentage = 0.3 * (100 / duration)

    render (
      <Toast message={message}/>
    , document.getElementById("toast-container"))

    toast.currentToast = true
    toast.timeout = setTimeout(toast.remove, duration * 10000)
  }
}