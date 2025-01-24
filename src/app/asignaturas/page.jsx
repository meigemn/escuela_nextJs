import { PrismaClient } from "@prisma/client";
import { Suspense } from "react";
const prisma = new PrismaClient();

async function PaginaAsignaturas() {
    return(
        <div>
            <h1>Asignaturas</h1>
            <Suspense fallback={<div className="">Cargando...</div>}>
                <Lista/>
            </Suspense>
        </div>
    )
}

export default PaginaAsignaturas;
//componente de servidor
async function Lista() {
    const asignatura = await prisma.asignatura.findMany();
    return (
        <div className="flex justify-center p-4 bg-blue-100 rounded-md">
            <table className="table-auto border-collapse border border-gray-300 bg-white shadow-md rounded-md w-full">
                <thead className="bg-blue-200">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Profesor</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Número de Horas</th>
                    </tr>
                </thead>
                <tbody>
                    {asignatura.map((asig) => (
                        <tr key={asig.id} className="hover:bg-blue-50">
                            <td className="border border-gray-300 px-4 py-2">{asig.nombre}</td>
                            <td className="border border-gray-300 px-4 py-2">{asig.profesor}</td>
                            <td className="border border-gray-300 px-4 py-2">{asig.num_horas}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
