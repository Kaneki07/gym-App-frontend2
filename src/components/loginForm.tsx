// src/components/LoginForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.PUBLIC_API_BASE_URL || 'https://gym-app-backend-2-pv91.onrender.com',
    timeout: 8000
});

export default function LoginForm() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [status, setStatus] = useState({ message: '', isError: false, isLoading: false });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus({ message: 'Validando credenciales...', isError: false, isLoading: true });

        try {
            // Enviamos email y password al endpoint de login
            const { data } = await api.post('/login', formData);
            
            // Guardamos el token y datos del usuario
            localStorage.setItem('token', data.jwt);
            localStorage.setItem('user', JSON.stringify(data.user));

            setStatus({ message: '¡Bienvenido de nuevo!', isError: false, isLoading: false });

            // Redirigir al dashboard tras 1 segundo
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1000);

        } catch (error: any) {
            let errorMsg = 'Error al iniciar sesión';
            if (error.response) {
                errorMsg = error.response.data.message || 'Credenciales incorrectas';
            }
            setStatus({ message: errorMsg, isError: true, isLoading: false });
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-4">
            <form onSubmit={handleSubmit} className="w-full space-y-6 bg-black/40 p-8 rounded-2xl border border-gray-900 shadow-2xl backdrop-blur-sm">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                        Acceso <span className="text-red-600">VIP</span>
                    </h2>
                    <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">Continúa tu evolución</p>
                </div>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1 ml-1">Email de Atleta</label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-gray-800 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-red-600 outline-none transition-all placeholder:text-gray-700"
                            placeholder="atleta@gym.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1 ml-1">Contraseña</label>
                        <input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-gray-800 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-red-600 outline-none transition-all placeholder:text-gray-700"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>

                {status.message && (
                    <div className={`p-3 rounded-lg text-xs text-center font-bold animate-pulse ${
                        status.isError ? 'bg-red-900/30 text-red-500 border border-red-900' : 'bg-green-900/30 text-green-500 border border-green-900'
                    }`}>
                        {status.message}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={status.isLoading}
                    className={`w-full font-black py-4 rounded-xl uppercase tracking-[0.2em] transition-all ${
                        status.isLoading 
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                        : 'bg-white text-black hover:bg-red-600 hover:text-white active:scale-[0.98]'
                    }`}
                >
                    {status.isLoading ? 'Verificando...' : 'Entrar al Gym'}
                </button>

                <div className="text-center">
                    <a href="/register" className="text-gray-500 hover:text-white text-[10px] uppercase font-bold tracking-widest transition-colors">
                        ¿No tienes cuenta? <span className="text-red-600">Regístrate aquí</span>
                    </a>
                </div>
            </form>
        </div>
    );
}