export interface ICliente {
    // Define Si o No está activada la cuenta
    "activada" : string,
    "apellidos" : string,
    // Nombre del box (en minúsculas)
    "box" : string,
    "dni" : string,
    "email" : string,
    "fechaNacimiento" : string,    
    "id" : string,
    "localidad" : string,    
    "nombre" : string,
    "sesionesRestantes" : number,
    "telefono" : string, 
    //"rol" : string,
}

export interface IEmpresa {
    // Nombre del box(en minúsculas) #id de la empresa / no hay 2 iguales
    "box" : string,
    "clientesEmpresa" : number,
    "email" : string,
    // Nombre de la empresa
    "nombre" : string,
    // tarifa basica 9e/mes máx 35 atletas 
    // tarifa media 25e/mes máx 70 atletas
    // tarifa avanzada 35 e/mes ilimitado
    "tarifa" : string,
    "telefono" : string
}