import { Request, Response } from 'express';
import {pool} from '../system/config/dbConnection'

export abstract class Staff implements InterfaceStaff {
    handleLogin(): void {
        throw new Error("Method not implemented.");
    }
    handleLogout(): void {
        throw new Error("Method not implemented.");
    }
    abstract can(action: string): boolean;
    protected getUserInfoById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(404).json({ error: `id must be provided!` })
            }
            const [rows] = await pool.query("select * from staffs where staffId = ? ", [id]) as any[];//telling the typescript that it is just an array
            if (rows.length === 0) {
                return res.status(404).json({ error: `cannot find ID: ${id}` })
            }
            res.status(200).json(rows[0])

        } catch (error) {
            console.log(`There is an error at staff getUserInfoById`);
            res.status(500).json({ error: (error as Error).message })
        }
    }

    protected getUserName = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(404).json({ error: `id must be provided!` })
            }
            const [rows] = await pool.query("select name from staffs where staffId = ? ", [id]) as any[];
            if (rows.length === 0) {
                return res.status(404).json({ error: `cannot find ID: ${id}` })
            }
            res.status(200).json(rows[0]);
        } catch (error) {
            console.log({ error: (error as Error).message })
            res.status(500).json({ Error: (error as Error).message });
        }
    }
    protected getUserEmail = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(404).json({ error: `id must be provided!` })
            }
            const [rows] = await pool.query(`select email from staffs where staffId = ?`, [id]) as any[]
            if (rows.length === 0) {
                return res.status(404).json({ error: `cannot find email with the ID: ${id}` });
            }
        } catch (error) {
            console.log({ Error: (error as Error).message })
            res.status(500).json({ Error: (error as Error).message })
        }
    }
    protected getUserRole = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(404).json({ error: `id must be provided!` })
            }
            const [rows] = await pool.query(`select role from staffs where staffId = ?`, [id]) as any[]
            if (rows.length === 0) {
                return res.status(404).json({ error: `cannot find role with the ID: ${id}` });
            }
        } catch (error) {
            console.log({ Error: (error as Error).message })
            res.status(500).json({ Error: (error as Error).message })
        }
    }
    setActive = async (req: Request, res: Response): Promise<boolean> => {
        try {
            
        } catch (error) {
            
        }
        return false;
    }
}