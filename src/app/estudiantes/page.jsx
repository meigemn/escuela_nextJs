import { PrismaClient } from "@prisma/client";
import { Suspense } from "react";
const prisma = new PrismaClient();

async function PaginaEstudiantes() {
    return(
        <div>
            <h1>Estudiantes</h1>
            <Suspense fallback={<div className="">Cargando...</div>}>
                <Lista/>
            </Suspense>
        </div>
    )
}

export default PaginaEstudiantes;
//componente de servidor
async function Lista() {
    const estudiantes = await prisma.estudiante.findMany();
    return (
        <div className="flex justify-center p-4 bg-blue-100 rounded-md">
            <table className="table-auto border-collapse border border-gray-300 bg-white shadow-md rounded-md">
                <thead className="bg-blue-200">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Fecha de Nacimiento</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Foto</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Tutor Legal</th>
                    </tr>
                </thead>
                <tbody>
                    {estudiantes.map((estudiante) => (
                        <tr key={estudiante.id} className="hover:bg-blue-50">
                            <td className="border border-gray-300 px-4 py-2">{estudiante.nombre}</td>
                            <td className="border border-gray-300 px-4 py-2">{new Date(estudiante.fecha_nacimiento).toLocaleDateString()}</td>
                            <td className="border border-gray-300 px-4 py-2"><img src={estudiante.foto} alt="" /></td>
                            <td className="border border-gray-300 px-4 py-2">{estudiante.tutor_legal}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
