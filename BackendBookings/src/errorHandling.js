export const errors = (codeError)=>{
    if(codeError === 1048){
        return {message:'Verifique que todos los campos esten llenados'}
    }else if(codeError ===1452){
        return {message:'Verifique que exista una habitacion con ese id'}
    }else if(codeError === 1062){
        return {message:'el numero ya existe elija otro numero de habitacion'}
    }
    return codeError
}