import { PrismaClient } from "@prisma/client";
import { Suspense } from "react";
const prisma = new PrismaClient();

async function PaginaEstudiante({ params, searchParams }) {
    const { id }= params;
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <Producto id={+id} />
        </Suspense>
    )
}

export default PaginaEstudiante;

///componente de servidor
async function Producto({ id }) {
    const estudiante = await prisma.estudiante.findUnique({
        where: {
            id,
        },
    });
    return (
        <div className="flex justify-center p-4 bg-blue-100 rounded-md">
            <table className="table-auto border-collapse border border-gray-300 bg-white shadow-md rounded-md">
                <thead className="bg-blue-200">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">Campo</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Valor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="hover:bg-blue-50">
                        <td className="border border-gray-300 px-4 py-2">ID</td>
                        <td className="border border-gray-300 px-4 py-2">{estudiante.id}</td>
                    </tr>
                    <tr className="hover:bg-blue-50">
                        <td className="border border-gray-300 px-4 py-2">Nombre</td>
                        <td className="border border-gray-300 px-4 py-2">{estudiante.nombre}</td>
                    </tr>
                    <tr className="hover:bg-blue-50">
                        <td className="border border-gray-300 px-4 py-2">Tutores</td>
                        <td className="border border-gray-300 px-4 py-2">{estudiante.tutor_legal}</td>
                    </tr>
                    <tr className="hover:bg-blue-50">
                        <td className="border border-gray-300 px-4 py-2">Foto</td>
                        <td className="border border-gray-300 px-4 py-2"><img  src={estudiante.foto} alt="" width="25px"/></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
