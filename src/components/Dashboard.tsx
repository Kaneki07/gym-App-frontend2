import React, { useEffect, useState } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            window.location.href = '/login';
        }
    }, []);

    if (!user) return <div className="text-white text-center p-10">Cargando...</div>;

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <h1 className="text-3xl font-black mb-6">Hola, {user.name}</h1>
            
            {/* Si es COACH */}
            {user.role === 'Coach' && (
                <div className="bg-red-900/20 border border-red-600 p-8 rounded-2xl mb-6">
                    <h2 className="text-2xl font-bold text-red-500 mb-2">PANEL DE COACH</h2>
                    <p>Bienvenido entrenador. Aquí puedes gestionar a tus atletas.</p>
                </div>
            )}

            {/* Si NO es Coach (es Cliente) */}
            {user.role !== 'Coach' && (
                <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl mb-6">
                    <h2 className="text-2xl font-bold text-gray-300 mb-2">PANEL DE ATLETA</h2>
                    <p>Aquí verás tus rutinas y dietas asignadas.</p>
                </div>
            )}
        </div>
    );
}