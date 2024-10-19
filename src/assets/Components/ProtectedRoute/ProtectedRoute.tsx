
import { Navigate } from 'react-router'

export default function ProtectedRoute({children}:any) {
if(localStorage.getItem('user') == null){
    return <Navigate to="/login" />
}

  return (
    <div>{children}</div>
  )
}
