import { Staff } from "./Staff";
class Receptionist extends Staff{
    handleLogin(): void {
        
    }
    handleLogout(): void {
        
    }
    can(action: string): boolean {
        return false;
    }
}