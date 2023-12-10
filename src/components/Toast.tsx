import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { Toast } from './ToastContainer';

export class toast extends React.Component {
  static currentToast: boolean;
  static timeout: ReturnType<typeof setTimeout> | null;

  currentToast = false;
  timeout = null;
  
  static remove() {
    const toastContainer = createRoot(document.getElementById("toast-container") as HTMLElement);
    toastContainer.unmount();
    // unmountComponentAtNode(document.getElementById("toast-container") as HTMLElement)
    toast.currentToast = false
    if (toast.timeout) {
      clearTimeout(toast.timeout)
      toast.timeout = null
    }
  }

  static add(message: string, options: any = null) {
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

    const toastContainer = createRoot(document.getElementById("toast-container") as HTMLElement);
    toastContainer.render(<Toast message={message}/>);

    toast.currentToast = true;
    toast.timeout = setTimeout(toast.remove, duration * 1000);
  }
}