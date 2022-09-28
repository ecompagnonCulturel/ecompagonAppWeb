/*
import   {Users}  from '../../authentification/models//users';
import   {Resources}  from './resource';


export class   Favoris {
     id:number;
     FavUser: Users;
     FavResource: Resources;
     FavDateModif:Date;
     FavStatut:String;
     FavSession:String;

} */
export class   Favoris {
     id:number;
     FavUser: number;
     FavResource: number;
     FavDateModif:Date;
     FavStatut:String;
     FavSession:String;

}