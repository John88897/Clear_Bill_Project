import { Staff } from "./Staff";

class Admin extends Staff {
    handleLogin(): void {

    }
    handleLogout(): void {
    }
    can(action: string): boolean {
        return false;
    }
}