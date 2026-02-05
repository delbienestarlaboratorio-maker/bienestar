import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

// GET: Obtener todos los usuarios
export async function GET() {
    try {
        const allUsers = await db.select({
            id: users.id,
            name: users.name,
            email: users.email,
            role: users.role,
            isActive: users.isActive,
            lastLogin: users.lastLogin,
            createdAt: users.createdAt,
        }).from(users);

        return NextResponse.json(allUsers);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Error al cargar usuarios' }, { status: 500 });
    }
}

// POST: Crear nuevo usuario
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, password, role } = body;

        if (!name || !email || !password) {
            return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await db.insert(users).values({
            name,
            email,
            password: hashedPassword,
            role: role || 'viewer',
            isActive: true,
        }).returning();

        return NextResponse.json(newUser[0], { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ error: 'Error al crear usuario' }, { status: 500 });
    }
}
