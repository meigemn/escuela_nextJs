'use client'

import { useRef } from "react";

function Modal({children,texto}) {

    const refModal = useRef()
    const openModal = () => refModal.current?.showModal()
    const closeModal = () => refModal.current?.close()

    return (
        <>
            <div onClick={openModal}>
                {texto}{/* boton */}
            </div>

            <dialog ref={refModal} >
                {children}{/* interior del dialogo */}
                <div onClick={closeModal}>Cerrar</div>
            </dialog>
        </>
    );
}

export default Modal;