import Modal from "@/components/modal";
import { eliminarGrupo, insertarGrupo, modificarGrupo } from "@/lib/actions";
import { PrismaClient } from "@prisma/client";

import { Suspense, use } from "react";
const prisma = new PrismaClient();

async function PaginaGrupos() {
    return (
        <div>
            <h1>GRUPOS</h1>
            <Suspense fallback={<div className="">Cargando...</div>}>
                <Lista />
            </Suspense>
        </div>
    )
}

export default PaginaGrupos;
//componente de servidor
async function Lista() {
    const grupos = await prisma.grupo.findMany()
    return (
        <div>
            {/* Modal insertar */}
            <Modal texto='Insertar grupo'>

                <form action={insertarGrupo}>
                    <input name="nombre" placeholder="Nombre" />
                    <input name="tutores" placeholder="Tutor/a" />
                    <input name="aula" placeholder="Aula" />
                    <button>Insertar grupo</button>
                </form>
            </Modal>


            {
                grupos.map(grupo =>


                    <div className="flex justify-center p-4 bg-blue-100 rounded-md" key={grupo.id}>
                        <Modal texto="Modificar">

                            {/* Modal modificar */}
                            <form action={modificarGrupo}>
                                <input type="hidden" name="id" defaultValue={grupo.id} />
                                <input name="nombre" defaultValue={grupo.nombre} />
                                <input name="tutores" defaultValue={grupo.tutores} />
                                <input name="aula" defaultValue={grupo.aula} />
                                <button>Modificar</button>
                            </form>
                        </Modal>

                        {/* Modal eliminar */}
                        <Modal texto="Eliminar">
                            <p>Desea eliminar el siguiente grupo?</p>
                            <p>{grupo.nombre}</p>
                            <p>{grupo.tutores}</p>
                            <p>{grupo.aula}</p>
                            <form action={eliminarGrupo}>
                                <input type="hidden" name="id" defaultValue={grupo.id} />
                                <button>Eliminar</button>
                            </form>
                        </Modal>

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
                                    <td className="border border-gray-300 px-4 py-2">{grupo.id}</td>
                                </tr>
                                <tr className="hover:bg-blue-50">
                                    <td className="border border-gray-300 px-4 py-2">Nombre</td>
                                    <td className="border border-gray-300 px-4 py-2">{grupo.nombre}</td>
                                </tr>
                                <tr className="hover:bg-blue-50">
                                    <td className="border border-gray-300 px-4 py-2">Profesor</td>
                                    <td className="border border-gray-300 px-4 py-2">{grupo.tutores}</td>
                                </tr>
                                <tr className="hover:bg-blue-50">
                                    <td className="border border-gray-300 px-4 py-2">Número de Horas</td>
                                    <td className="border border-gray-300 px-4 py-2">{grupo.aula}</td>
                                </tr>

                            </tbody>
                        </table>


                    </div>


                )
            }
        </div>
    );


}
