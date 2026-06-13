import { router } from "./routes/routes"
import { Toaster } from "react-hot-toast"
import { RouterProvider } from "react-router-dom"

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  )
}

export default App
