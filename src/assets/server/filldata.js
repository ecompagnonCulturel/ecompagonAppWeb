// server > filldata.js  npm run filldata      npm run runServer
const faker = require('faker');
let pictures='../images/resources'
const database = {
  users: [],
  profile: [],
  account: [],
  picture: [],
  resource: [],
  comment: [],
  course:[],
  course_resource:[],


};
for (let i = 1; i <= 150; i++) {
  database.users.push({
    idUsers: i,
    nameUsers: faker.name.firstName(),
    mailUsers: faker.internet.email(),
    CPUsers: "TETA0762020"+i,
    statusUsers: 1,
  });
}
//Creation des profils
for (let i = 1; i <= 4; i++) {
var desc,TypeRes
if(i==1)
{
    desc='Formateur';


}
if(i==2)
{
    desc='Etudiant';

}
if(i==3)
{
    desc='Chercheur';

}
if(i==4)
{
    desc='Administrateur';

}
  database.profile.push({
      idProfile: i,
      descProfile: desc,
      status: 1,
    });

//creation des comptes
database.account.push({
   passwordAccount: desc,
    creationDateAccount:faker.date.recent(),
    updateDateAccount:faker.date.recent(),
    users:{ idUsers: i,
            nameUsers: faker.name.firstName(),
            mailUsers: faker.internet.email(),
             CPUsers: "TETA0762020"+i,
            statusUsers: 1,
            },
    profile:{idProfile: i,
              descProfile: desc,
              status: 1
              },
    statusAccount: 1,
  });

  //creation des photos
  database.picture.push({
      id: i,
      pictureDesc:'image_'+i,
      pictureDate:faker.date.recent(),
      pictureUrl:pictures+'/image'+i+'.png',
      pictureStatus: 1,
    });

     //creation des commentaires
      database.comment.push({
          id: i,
          commentId:'',
          commentDesc:'comment'+i,
          commentDate:faker.date.recent(),
          commentUser:'',
          commentStatus: 1,
        });

//creation des ressources
  database.resource.push({
     id:i,
     ResSession: 'hivers 2021',
     ResDesc: 'ressources'+i,
     ResType:'Catégorie '+i,
     ResUrl: 'https://www.uqtr.ca/',
     ResLieu:1650+i+' Rue du père marquette',
     ResDate:faker.date.recent(),
     ResComment:'',
     ResLike:'',
     ResPicture:[{
                   "id": i,
                  "pictureDesc": "image_"+i,
                  "pictureDate": faker.date.recent(),
                  "pictureUrl": "../../../../assets/images/resources/image"+i+".png",
                  "pictureStatus": 1
                  },
                  {
                    "id": i+1,
                    "pictureDesc": "image_"+i+1,
                    "pictureDate": faker.date.recent(),
                    "pictureUrl": "../../../../assets/images/resources/image"+(i+1)+".png",
                    "pictureStatus": 1
                    }],
     ResUpdateDate:faker.date.recent(),
     ResStatus: 1,
    });

    //creation des cours
      database.course.push({
     id:i,
     courSession: 'hivers 2021',
     courDesc: 'cours'+i,
     courType:'éducatif',
     courLieu:faker.seed(0),
     courDateStart:faker.date.recent(),
     courProf:'Prof cours'+i,
     courDateEnd:faker.date.recent(),
     courStudGroup:{
                      id:i,
                      groupNom:'groupe'+i,
                      groupDateCreat:faker.date.recent(),
                      groupSession:'hiver 2021',
                      groupEtudiant:{
                                        id:i,
                                        etudNom:'Etudiant'+i,
                                        etudPrenom:'Etudant Prenom'+i,
                                        etudCP:"TETA0762020"+i,
                                     }


                    },
     courUpdateDate:faker.date.recent(),
     courStatus: 1,
    });

     //creation des cours
          database.course_resource.push({
         id:i,
         coursResIntention:'Intention cours-ressource'+i,
         coursResResource:{//debut ressource
                           id:i,
                           ResSession: 'hivers 2021',
                           ResDesc: 'ressources'+i,
                           ResUrl: 'https://www.uqtr.ca/',
                           ResType:'Catégorie '+i,
                           ResLieu:1650+i+' Rue du père marquette',
                           ResDate:faker.date.recent(),
                           ResComment:'',
                           ResLike:'',
                           ResPicture:[{
                                         "id": i,
                                        "pictureDesc": "image_"+i,
                                        "pictureDate": faker.date.recent(),
                                        "pictureUrl": "../../../../assets/images/resources/image"+i+".png",
                                        "pictureStatus": 1
                                        },
                                        {
                                          "id": i+1,
                                          "pictureDesc": "image_"+i+1,
                                          "pictureDate": faker.date.recent(),
                                          "pictureUrl": "../../../../assets/images/resources/image"+(i+1)+".png",
                                          "pictureStatus": 1
                                          }],
                           ResUpdateDate:faker.date.recent(),
                           ResStatus: 1,
                              },//fin ressource
         coursResCourse:{//debut cours
                               id:i,
                               courSession: 'hivers 2021',
                               courDesc: 'cours'+i,
                               courType:'éducatif',
                               courLieu:faker.seed(0),
                               courDateStart:faker.date.recent(),
                               courProf:'Prof cours'+i,
                               courDateEnd:faker.date.recent(),
                               courStudGroup:'Student groupe'+i,
                               courUpdateDate:faker.date.recent(),
                               courStatus: 1
                           },//fin cours


        });

}

/*//creation des comptes

for (let i = 1; i <= 4; i++) {
database.account.push({
    users: users[i],
    profile: profile[i],
    passwordAccount: desc,
    creationDateAccount:faker.date.recent(),
    updateDateAccount:faker.date.recent(),
    statusAccount: 1,
  });
}*/





console.log(JSON.stringify(database));