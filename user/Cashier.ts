import { Staff } from "./Staff";
class Cashier extends Staff{
    handleLogin(): void {
        
    }
    handleLogout(): void {
        
    }
    can(action: string): boolean {
        return false;
    }
}