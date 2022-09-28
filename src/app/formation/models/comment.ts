import   {Users}  from '../../authentification/models//users';

export class   Comments {
id: number;
commentId:Comments;
commentDesc:String;
commentDate:Date;
commentUser:Users;
commentStatus: String;
}