export class user{
    id:number= 0;
    Nombre_Usuario:string="";
    password:string="";
    correo:string="";
    direccion:string="";
    fecha_registro:Date = new Date(Date.now());
    enabled:boolean = false;
    genero:string= "";
    edad:number= 0;
    dni:string= "";

}