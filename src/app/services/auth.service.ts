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

        let id = this.idReserva;

        let horaPush = hour.concat(":").concat(minutes);

        let ref = this._db.database.ref("Reservas/"+id);

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

    login(email: string, password: string) {
        this.afAuth
            .auth
            .signInWithEmailAndPassword(email, password)
            .then(data => {
                
            });
        this.getLoggedUserFirebase();
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

        let ref = this.getClientesRefencia();
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