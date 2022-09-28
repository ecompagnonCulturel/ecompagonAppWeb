import   {Users}  from '../../authentification/models//users';
import   {Comments}  from './comment';
import   {Pictures}  from './picture';

export class   Resources {
     id:number;
     ressSession: String;
     ressDesc: String;
     ressType:String;
     ressLieu:String;
     ressDate:Date;
     ressComment:Comments;
     ressPicture:Pictures;
     ressUpdateDate:Date;
     ressStatus: String;
}
