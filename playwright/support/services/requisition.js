
export const requisitionService =(request)=>{

    const requisition = async (payloadDinamico) => {
        return await request.post('https://serverest.dev/usuarios', { 
            data: payloadDinamico 
        })
    }

    return {
        requisition
    }
}