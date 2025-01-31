import { Loader2 } from "lucide-react"
 
import { Button } from "@/components/ui/button"

const LoadingButton = () => {
    return (
        <Button disabled>
            <Loader2 className="animate-spin mr-2 h-4 w-4" />
            Please wait
        </Button>
    );
}

export default LoadingButton;
