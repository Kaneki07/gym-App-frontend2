// src/components/RegisterForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.PUBLIC_API_BASE_URL || 'https://gym-app-backend-2-pv91.onrender.com',
    timeout: 80000
});

export default function RegisterForm() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [status, setStatus] = useState({ message: '', isError: false, isLoading: false });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password.length < 6) {
            return setStatus({ message: 'Mínimo 6 caracteres requeridos', isError: true, isLoading: false });
        }
        setStatus({ message: 'Procesando registro...', isError: false, isLoading: true });

        try {
            const { data } = await api.post('/users', formData);
            setStatus({ message: data.message || '¡Atleta registrado!', isError: false, isLoading: false });
            setFormData({ name: '', email: '', password: '' });
            
            setTimeout(() => { window.location.href = '/login'; }, 1500);
        } catch (error: any) {
            let errorMsg = error.response?.data?.message || 'Error de conexión';
            setStatus({ message: errorMsg, isError: true, isLoading: false });
        }
    };

    return (
        <div className="w-full max-w-[440px] mx-auto px-2">
            {/* Botón Volver - Optimizado para pulgar */}
            <div className="mb-8">
                <a 
                    href="/" 
                    className="inline-flex items-center text-gray-500 hover:text-red-500 text-[10px] font-black uppercase tracking-[0.2em] transition-all group"
                >
                    <span className="mr-2 bg-gray-900 p-2 rounded-full group-hover:bg-red-600 group-hover:text-white transition-all">←</span> 
                    Volver al Inicio
                </a>
            </div>

            <form onSubmit={handleSubmit} className="w-full space-y-6 bg-gray-900/50 md:bg-black/40 p-6 sm:p-8 rounded-[2rem] border border-gray-800 shadow-2xl backdrop-blur-md">
                <div className="text-center">
                    <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter italic">
                        Únete a la <span className="text-red-600">Élite</span>
                    </h2>
                    <p className="text-gray-500 text-[9px] uppercase tracking-[0.3em] font-bold mt-2">Crea tu perfil de atleta</p>
                </div>
                
                <div className="space-y-4">
                    <div className="group">
                        <label className="block text-gray-500 text-[9px] font-black uppercase tracking-widest mb-2 ml-2 group-focus-within:text-red-600 transition-colors">Nombre Completo</label>
                        <input
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-gray-800 rounded-2xl py-4 px-5 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all placeholder:text-gray-800"
                            placeholder="Ej. Marcus Vicius"
                            required
                            disabled={status.isLoading}
                        />
                    </div>

                    <div className="group">
                        <label className="block text-gray-500 text-[9px] font-black uppercase tracking-widest mb-2 ml-2 group-focus-within:text-red-600 transition-colors">Email de Atleta</label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-gray-800 rounded-2xl py-4 px-5 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all placeholder:text-gray-800"
                            placeholder="atleta@gym.com"
                            required
                            disabled={status.isLoading}
                        />
                    </div>

                    <div className="group">
                        <label className="block text-gray-500 text-[9px] font-black uppercase tracking-widest mb-2 ml-2 group-focus-within:text-red-600 transition-colors">Contraseña</label>
                        <input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-gray-800 rounded-2xl py-4 px-5 text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all placeholder:text-gray-800"
                            placeholder="Mínimo 6 caracteres"
                            required
                            disabled={status.isLoading}
                        />
                    </div>
                </div>

                {status.message && (
                    <div className={`p-4 rounded-xl text-[10px] text-center font-black uppercase tracking-widest animate-pulse ${
                        status.isError ? 'bg-red-600/10 text-red-500 border border-red-600/20' : 'bg-green-600/10 text-green-500 border border-green-600/20'
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
                        : 'bg-red-600 text-white hover:bg-red-700 active:scale-[0.96] shadow-red-600/20'
                    }`}
                >
                    {status.isLoading ? 'Registrando...' : 'Empezar Transformación'}
                </button>

                <p className="text-center text-gray-600 text-[9px] font-bold uppercase tracking-widest">
                    ¿Ya eres miembro? <a href="/login" className="text-white hover:text-red-600 transition-colors">Inicia Sesión</a>
                </p>
            </form>
        </div>
    );
}