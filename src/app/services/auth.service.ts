import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { ICliente, IEmpresa } from '../interfaces/interfaces';
import { Router } from '@angular/router';

@Injectable()

export class AuthService {
    clienteKey: string;
    clientes: ICliente[] = [];
    cliente: ICliente;
    email: string;

    // variable para guardar el id de las reservas(fecha)
    idReserva: string = "";

    // variable para guardar las reservas de un usuario logueado
    reservasRestantesUsuario: number = 2;

    constructor(private _db: AngularFireDatabase, public afAuth: AngularFireAuth, private router: Router){

    }

    getClientesRefencia() : firebase.database.Reference {
        return this._db.database.ref("Clientes");
    }

    getReservasReferencia() : firebase.database.Reference {
        return this._db.database.ref("Reservas");
    }

    getEmpresaReferencia() : firebase.database.Reference {
        return this._db.database.ref("Empresas");
    }

    insertarReserva(year: string, month: string, day: string, hour: string, minutes: string) {
        //let ref = this.getReservasReferencia();
        let time = new Date(parseInt(year), parseInt(month), parseInt(day), parseInt(hour), parseInt(minutes));

        this.getReservasRestantes();

        this.reservasRestantesUsuario = 2;

        this.idReserva = "";
        this.idReserva.concat(day).concat("-").concat(month).concat("-").concat(year);

        let id = "";
        id += day;
        id += "-";
        id += month;
        id += "-";
        id += year;

        console.log("El id es " + id + "me llegan parametros "+year+month+day);

        let horaPush = hour.concat(":").concat(minutes);

        let ref = this._db.database.ref("/Reservas/"+id);

        let data = { 
            //"Cliente": this.clienteKey,
            "Cliente": "yo",
            "Hora": horaPush
        }

        ref.push(data);
        
        this.reservasRestantesUsuario--;
    }

    getReservasRestantes() : number {
        // TODO
        let ref = this.getClientesRefencia();

        return 1;
    }

    saveClientes() {
        this.clientes = [];
        let ref = this.getClientesRefencia();

        ref.once("value", snapshot => {
            snapshot.forEach(child => {
                let value = child.val();
                this.clientes.push(value);
            })
        })
    }

    async userIsAllowedToLogin(uid: string) : Promise<boolean> {
        let allowed = false;

        let ref = this.getClientesRefencia();

        await ref.once("value", snapshot => {
            snapshot.forEach(child => {
                let value = child.val();
                console.log("value " + value);
                if(uid === value.id) {
                    console.log("value id " + value.id);
                    if(value.activada === "si"){
                        console.log("value activada " + value.activada);
                        allowed = true;
                        return true;                 
                    } else {
                        console.log("value no activada " + value.activada);
                        allowed = false;
                        return true;
                    }
                }
            })
        })

        return allowed;
    }

    login(email: string, password: string) {        
        this.afAuth
        .auth
        .signInWithEmailAndPassword(email, password)
        .then(data => {
            
        });
        this.getLoggedUserFirebase();
        console.log("la key la tengo " + this.clienteKey);

        let allowed = this.userIsAllowedToLogin(this.clienteKey);
        if(!allowed) {
            this.signOutNew();
            console.log("no estoy activado y me deslogueo");
        } else {
            console.log("estoy activado y sigo logueado");
        }
    }

    async register(email: string, password: string) {
        await this.afAuth
                .auth
                .createUserWithEmailAndPassword(email, password)
                .then(data => {
                    console.log(data);
                })
                .catch((error: any) => 
                    console.error(error)
                );
    }

    registrarInfoUsuario(user: ICliente) {
        //let ref = this.getClientesRefencia();
        let ref = this._db.database.ref("Clientes/");
        ref.push(user);
    }

    signOut() {
        this.clienteKey = "";
        return this.afAuth
            .auth
            .signOut()
            .then(() => {
                this.router.navigate(['auth']);
            })            
    }

    async signOutNew() {
        this.clienteKey = "";
        return await this.afAuth
            .auth
            .signOut()
            .then(() => {
                // cerrada sesion
            })
    }

    forgotPass(email: string) {
        this.afAuth
            .auth
            .sendPasswordResetEmail(email)
            .then(function() {
                window.alert('El email de recuperación de contraseña ha sido enviado, revise su inbox.');
            })
            .catch(function(error){
                // error
            })
    }

    async returnKeyOfUserFirebase(email: string, password: string) : Promise<string> {
        await this.login(email, password);
        let key = await this.afAuth.auth.currentUser.uid;
        this.signOutNew();
        return key;
    }

    getLoggedUserFirebase() {
        this.clienteKey = "";
        this.clienteKey = this.afAuth.auth.currentUser.uid;
        /*this.afAuth.auth.onAuthStateChanged((user) => {
            if(user) {
                this.clienteKey = user.uid;
            } else {
                // nada
            }
        })*/
    }
}