import toast, { Toaster } from 'react-hot-toast'
import { CheckCircle2, XCircle, AlertCircle, Info } from 'lucide-react'

export { Toaster }

const toastStyles = {
  success: {
    icon: <CheckCircle2 className="w-5 h-5 text-primary" />,
    className:
      'bg-dark-glass backdrop-blur-xl border border-primary/30 text-white shadow-glow-primary',
  },
  error: {
    icon: <XCircle className="w-5 h-5 text-red-500" />,
    className:
      'bg-dark-glass backdrop-blur-xl border border-red-500/30 text-white shadow-lg',
  },
  warning: {
    icon: <AlertCircle className="w-5 h-5 text-secondary" />,
    className:
      'bg-dark-glass backdrop-blur-xl border border-secondary/30 text-white shadow-lg',
  },
  info: {
    icon: <Info className="w-5 h-5 text-blue-400" />,
    className:
      'bg-dark-glass backdrop-blur-xl border border-blue-400/30 text-white shadow-lg',
  },
}

export const showToast = {
  success: (message: string) => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } ${toastStyles.success.className} max-w-md w-full shadow-lg rounded-xl pointer-events-auto flex items-center gap-3 p-4`}
        >
          {toastStyles.success.icon}
          <p className="text-sm font-medium flex-1">{message}</p>
        </div>
      ),
      { duration: 3000 }
    )
  },

  error: (message: string) => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } ${toastStyles.error.className} max-w-md w-full shadow-lg rounded-xl pointer-events-auto flex items-center gap-3 p-4`}
        >
          {toastStyles.error.icon}
          <p className="text-sm font-medium flex-1">{message}</p>
        </div>
      ),
      { duration: 4000 }
    )
  },

  warning: (message: string) => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } ${toastStyles.warning.className} max-w-md w-full shadow-lg rounded-xl pointer-events-auto flex items-center gap-3 p-4`}
        >
          {toastStyles.warning.icon}
          <p className="text-sm font-medium flex-1">{message}</p>
        </div>
      ),
      { duration: 3000 }
    )
  },

  info: (message: string) => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } ${toastStyles.info.className} max-w-md w-full shadow-lg rounded-xl pointer-events-auto flex items-center gap-3 p-4`}
        >
          {toastStyles.info.icon}
          <p className="text-sm font-medium flex-1">{message}</p>
        </div>
      ),
      { duration: 3000 }
    )
  },
}
