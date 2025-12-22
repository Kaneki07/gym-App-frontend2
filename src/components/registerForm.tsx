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
            return setStatus({ message: 'La contraseña debe tener al menos 6 caracteres', isError: true, isLoading: false });
        }
        setStatus({ message: 'Procesando registro...', isError: false, isLoading: true });

        try {
            const { data } = await api.post('/users', formData);
            setStatus({ message: data.message || '¡Registro exitoso!', isError: false, isLoading: false });
            setFormData({ name: '', email: '', password: '' });
        } catch (error: any) {
            let errorMsg = 'Error de conexión con el servidor';
            if (error.response) {
                errorMsg = error.response.data.message || 'Error en los datos enviados';
            } else if (error.request) {
                errorMsg = 'El servidor no responde. Verifica tu conexión.';
            }
            setStatus({ message: errorMsg, isError: true, isLoading: false });
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            {/* Botón Volver al Index */}
            <div className="mb-6">
                <a 
                    href="/" 
                    className="text-gray-500 hover:text-red-500 text-xs font-bold uppercase tracking-widest flex items-center transition-colors group"
                >
                    <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> 
                    Volver al Inicio
                </a>
            </div>

            <form onSubmit={handleSubmit} className="w-full space-y-5 bg-black/20 p-6 rounded-2xl border border-gray-900 shadow-2xl">
                <h2 className="text-3xl font-black text-center text-red-600 uppercase tracking-tighter mb-4">
                    Únete a la Élite
                </h2>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1 ml-1">Nombre</label>
                        <input
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-gray-800 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-red-600 outline-none transition-all"
                            placeholder="Tu nombre completo"
                            required
                            disabled={status.isLoading}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1 ml-1">Email</label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-gray-800 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-red-600 outline-none transition-all"
                            placeholder="atleta@gym.com"
                            required
                            disabled={status.isLoading}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1 ml-1">Contraseña</label>
                        <input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-gray-800 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-red-600 outline-none transition-all"
                            placeholder="Mínimo 6 caracteres"
                            required
                            disabled={status.isLoading}
                        />
                    </div>
                </div>

                {status.message && (
                    <div className={`p-3 rounded-lg text-xs text-center font-bold transition-all duration-300 ${
                        status.isError ? 'bg-red-900/30 text-red-500 border border-red-900' : 'bg-green-900/30 text-green-500 border border-green-900'
                    }`}>
                        {status.message}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={status.isLoading}
                    className={`w-full font-black py-4 rounded-xl uppercase tracking-[0.2em] transition-all shadow-xl ${
                        status.isLoading 
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed opacity-70' 
                        : 'bg-red-700 hover:bg-red-600 text-white active:scale-[0.98] shadow-red-900/20'
                    }`}
                >
                    {status.isLoading ? 'Registrando...' : 'Empezar Transformación'}
                </button>
            </form>
        </div>
    );
}