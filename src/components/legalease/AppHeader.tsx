import { Settings, User } from "lucide-react";
import { Button } from "../ui/button";

export function AppHeader() {
    return (
        <header className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <User className="h-6 w-6" />
            </div>
            <div>
            <p className="text-sm text-muted-foreground">Welcome back,</p>
            <h1 className="text-lg font-bold">Alex</h1>
            </div>
        </div>
        <Button variant="ghost" size="icon">
            <Settings className="h-6 w-6" />
        </Button>
        </header>
    )
}
