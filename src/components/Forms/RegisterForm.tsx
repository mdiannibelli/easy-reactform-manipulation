import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { z } from "zod";
type FormData = {
    name: string;
    email: string;
    phone: string;
    password1: string;
    password2: string;
}

const schema = z.object({
    name: z.string().min(3, 'Nombre requerido').max(15, 'Nombre demasiado extenso'),
    email: z.string().min(1, 'Email requerido').email('Email inválido'),
    phone: z.string().min(10, 'Debe tener 10 dígitos').max(10, 'Debe tener 10 dígitos'),
    password1: z.string().min(8, 'Debe tener mínimo 8 carácteres').max(30, 'No puede tener más de 30 carácteres'),
    password2: z.string().min(8, 'Debe tener mínimo 8 carácteres').max(30, 'No puede tener más de 30 carácteres'),
}).refine((values) => {
    return values.password1 === values.password2
},
    {
        message: "Las contraseñas no coinciden!",
        path: ["password2"]
    })

export const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password1: "",
            password2: ""
        }
    });

    function onSubmit(data: FormData) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(console.log({ data }))
            }, 3000)
        })
    }
    return (
        <div className="p-16 shadow-xl rounded-xl bg-slate-50">
            <h2 className="text-orange-500 text-center font-bold text-2xl mb-8">Crear nueva cuenta</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4 justify-center items-center'>
                <div className="flex flex-col">
                    {errors.name && <span className="text-red-500 text-xs mt-2 p-1">{errors.name.message}</span>}
                    <input
                        type="text"
                        id='name'
                        className="ring-1 ring-neutral-200 bg-slate-100 select-none outline-none w-[300px] py-3 px-3 rounded-md text-gray-700 focus:bg-orange-100 focus:border-orange-700 focus:ring-2 focus:ring-orange-500"
                        placeholder="Nombre completo"
                        {...register('name')}
                    />
                </div>
                <div className="flex flex-col">
                    {errors.email && <span className="text-red-500 text-xs mt-2 p-1">{errors.email.message}</span>}
                    <input
                        type="text"
                        id='email'
                        className="ring-1 ring-neutral-200 bg-slate-100 select-none outline-none w-[300px] py-3 px-3 rounded-md text-gray-700 focus:bg-orange-100 focus:border-orange-700 focus:ring-2 focus:ring-orange-500"
                        placeholder="Dirección E-mail"
                        {...register('email')}
                    />
                </div>
                <div className="flex flex-col">
                    {errors.phone && <span className="text-red-500 text-xs mt-2 p-1">{errors.phone.message}</span>}
                    <input
                        type="text"
                        id='phone'
                        className="ring-1 ring-neutral-200 bg-slate-100 select-none outline-none w-[300px] py-3 px-3 rounded-md text-gray-700 focus:bg-orange-100 focus:border-orange-700 focus:ring-2 focus:ring-orange-500"
                        placeholder="Celular"
                        {...register('phone')}
                    />
                </div>
                <div className="flex flex-col">
                    {errors.password1 && <span className="text-red-500 text-xs mt-2 p-1">{errors.password1.message}</span>}
                    <input
                        type="password"
                        id='password1'
                        className="ring-1 ring-neutral-200 bg-slate-100 select-none outline-none w-[300px] py-3 px-3 rounded-md text-gray-700 focus:bg-orange-100 focus:border-orange-700 focus:ring-2 focus:ring-orange-500"
                        placeholder="Contraseña"
                        {...register('password1')}
                    />
                </div>
                <div className="flex flex-col">
                    {errors.password2 && <span className="text-red-500 text-xs mt-2 p-1">{errors.password2.message}</span>}
                    <input
                        type="password"
                        id='password2'
                        className="ring-1 ring-neutral-200 bg-slate-100 select-none outline-none w-[300px] py-3 px-3 rounded-md text-gray-700 focus:bg-orange-100 focus:border-orange-700 focus:ring-2 focus:ring-orange-500"
                        placeholder="Repetir contraseña"
                        {...register('password2')}
                    />
                </div>
                <div>
                    <button disabled={isSubmitting} type="submit" className="bg-orange-600 hover:bg-orange-400 duration-500 text-white uppercase font-semibold text-lg w-[300px] rounded-md py-2">{isSubmitting ? 'Registrando...' : 'Registrarse'}</button>
                </div>
            </form>
        </div>
    )
}
