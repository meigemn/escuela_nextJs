'use server'
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();



async function insertarGrupo(formData) {
    const nombre = formData.get('nombre')
    const tutores = formData.get('tutores')
    const aula = formData.get('aula')

    await prisma.grupo.create({
        data: {
            nombre: nombre,
            tutores: tutores,
            aula: aula,
        }
    })
    revalidatePath('/grupos')
}
async function modificarGrupo(formData) {
    const id= Number(formData.get('id'))
    const nombre = formData.get('nombre');
    const tutores = formData.get('tutores');
    const aula = formData.get('aula');

    await prisma.grupo.update({
        where: {
            id: id,
        },
        data: {
            nombre: nombre,
            tutores: tutores,
            aula: aula,
        }
    })
    revalidatePath('/grupos')
}
async function eliminarGrupo(formData) {
    const id = Number(formData.get('id'));
    await prisma.grupo.delete({
        where: {
            id: id,
        }
    })
    revalidatePath('/grupos')
}
export { insertarGrupo, modificarGrupo, eliminarGrupo };

/*------------------------------------------------ESTUDIANTES-------------------------------------- */