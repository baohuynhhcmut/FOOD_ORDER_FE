import { useState } from "react"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import Login from "./Login"
import Spinner from "./Spinner"
import Register from "./Register"
import ForgetPassword from "./ForgetPassword"

export enum AuthMode {
    Login,
    Register,
    ResetPassword,
    Google,
    Loading
}

const AuthModal = () => {

    const [view,setView] = useState<AuthMode>(AuthMode.Login)
    const [open,setOpen] = useState(false)

    const renderView = (state:AuthMode) => {
        switch (state) {
            case AuthMode.Login:
                return <Login setView={setView} setOpen={setOpen} />
            case AuthMode.Register:
                return <Register setView={setView}setOpen={setOpen} />
            case AuthMode.ResetPassword:
                return <ForgetPassword setView={setView} setOpen={setOpen} />
            case AuthMode.Loading:
                return <Spinner />
            default:
                break;
        }
    }

    const renderTitle = (state:AuthMode) => {
        switch (state) {
            case AuthMode.Login:
                return "Đăng nhập"
            case AuthMode.Register:
                return "Đăng kí"
            case AuthMode.ResetPassword:
                return "Quên mật khẩu"
            default:
                break;
        }
    }

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button onClick={() => setOpen(true)}>Đăng nhập</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>{renderTitle(view)}</DialogTitle>
                    {renderView(view)}
                </DialogContent>
            </Dialog>
        </>
    )
}
export default AuthModal