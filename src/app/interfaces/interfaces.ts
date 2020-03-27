export interface ICliente {
    "idUser" : string,
    "empresaAsociada" : string,
    "nombre" : string,
    "apellido1" : string,
    "apellido2" : string,
    "rol" : string,
    "sesionesRestantes" : number,
    "email" : string,
}

export interface IEmpresa {
    "idEmpresa" : string,
    "email" : string,
    "clientesEmpresa" : number,
    "tarifa" : string,
}