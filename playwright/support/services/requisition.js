
export const requisitionService = (request) => {

    const requisition = async (payloadDinamico) => {
        return await request.post('https://serverest.dev/usuarios', {
            data: payloadDinamico
        })
    }

    return {
        requisition
    }
}

export const usuariosServices = (request) => {
    const getUsuarioById = async (id) => {
        return await request.get(`https://serverest.dev/usuarios/${id}`);
    }

    return {
        getUsuarioById
    }

};

export const loginService = (request) => {

    const requisitionLogin = async (payloadDinamico) => {
        return await request.post('https://serverest.dev/login', {
            data: payloadDinamico
        })
    }

    return {
        requisitionLogin
    }
}


