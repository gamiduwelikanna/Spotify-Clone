import {Button} from "./components/ui/button.tsx";
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/clerk-react";

function App() {
    return(
        <><header>
            <SignedOut>
                <SignInButton>
                    <Button>Sign In
                    </Button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </header>
        </>
    );
}

export default App
