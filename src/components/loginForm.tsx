// src/components/LoginForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.PUBLIC_API_BASE_URL || 'https://gym-app-backend-2-pv91.onrender.com',
    timeout: 80000
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
            const { data } = await api.post('/login', formData);
            
            // Aquí se guarda el token y el usuario (que ahora incluye { role: "..." })
            localStorage.setItem('token', data.jwt);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            setStatus({ message: '¡Bienvenido de nuevo!', isError: false, isLoading: false });

            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1000);

        } catch (error: any) {
            let errorMsg = error.response?.data?.message || 'Error al iniciar sesión';
            setStatus({ message: errorMsg, isError: true, isLoading: false });
        }
    };

    return (
        <div className="w-full max-w-[440px] mx-auto px-2">
            <form 
                onSubmit={handleSubmit} 
                className="w-full space-y-6 bg-black/60 p-7 sm:p-10 rounded-[2.5rem] border border-red-600/30 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_20px_rgba(220,38,38,0.15)] backdrop-blur-md hover:shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_30px_rgba(220,38,38,0.25)] transition-all duration-500"
            >
                <div className="text-center space-y-3">
                    <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter italic">
                        Acceso <span className="text-red-600 drop-shadow-[0_0_10px_rgba(220,38,38,0.6)]">VIP</span>
                    </h2>
                    <div className="flex justify-center">
                        <span className="h-[2px] w-12 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]"></span>
                    </div>
                    <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-black">Continúa tu evolución</p>
                </div>
                
                <div className="space-y-5">
                    <div className="group">
                        <label className="block text-gray-500 text-[9px] font-black uppercase tracking-widest mb-2 ml-2 group-focus-within:text-red-600 transition-colors">
                            Email de Atleta
                        </label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-gray-900/40 border border-gray-800 rounded-2xl py-4 px-5 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all placeholder:text-gray-800 text-sm shadow-inner"
                            placeholder="atleta@gym.com"
                            required
                        />
                    </div>

                    <div className="group">
                        <label className="block text-gray-500 text-[9px] font-black uppercase tracking-widest mb-2 ml-2 group-focus-within:text-red-600 transition-colors">
                            Contraseña
                        </label>
                        <input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-gray-900/40 border border-gray-800 rounded-2xl py-4 px-5 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all placeholder:text-gray-800 text-sm shadow-inner"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>

                {status.message && (
                    <div className={`p-4 rounded-xl text-[10px] text-center font-black uppercase tracking-wider animate-in fade-in zoom-in duration-300 border ${
                        status.isError ? 'bg-red-600/10 text-red-500 border-red-600/20 shadow-[0_0_15px_rgba(220,38,38,0.1)]' : 'bg-green-600/10 text-green-500 border-green-600/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]'
                    }`}>
                        {status.message}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={status.isLoading}
                    className={`w-full font-black py-5 rounded-2xl uppercase tracking-[0.2em] transition-all text-xs shadow-xl ${
                        status.isLoading 
                        ? 'bg-gray-800 text-gray-600 cursor-not-allowed' 
                        : 'bg-red-600 text-white hover:bg-red-700 active:scale-[0.96] shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_25px_rgba(220,38,38,0.5)]'
                    }`}
                >
                    {status.isLoading ? 'Verificando...' : 'Entrar al Gym'}
                </button>

                <div className="text-center pt-2">
                    <a href="/register" className="group text-gray-500 hover:text-white text-[10px] uppercase font-black tracking-widest transition-all">
                        ¿No tienes cuenta? <span className="text-red-600 group-hover:underline underline-offset-4 decoration-red-600/50">Regístrate ahora</span>
                    </a>
                </div>
            </form>
        </div>
    );
}