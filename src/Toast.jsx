import { useEffect } from 'react'

const Toast = ({ notification, setNotification }) => {
  useEffect(() => {
    return () => {
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }, [])
  return (
    <div className="toast absolute left-0 top-6 flex justify-center items-center w-72 h-10 z-10 bg-slate-600/70 rounded-md ring-1 ring-green-900">
      <div className="m-1 p-1 w-full flex justify-center text-white font-semibold uppercase">
        {notification}
      </div>
    </div>
  )
}
export default Toast
