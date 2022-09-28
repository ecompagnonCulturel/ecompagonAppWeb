import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResourcePage } from './resource.page';
import { CategoryPage } from './category/category.page';
import { CoursPage } from './cours/cours.page';
import { CategoryDetailPage } from './category/category-detail/category-detail.page';

const routes: Routes = [
{
            path: '',
            component: ResourcePage,
            children: [
             {
                        path: 'category',
                        component: CategoryPage,
                         },

                        {
                                path: 'cours',
                                component: CoursPage

                        },
                        {
                            path: 'category/category-detail/:id/comment/:id',
                            loadChildren: () => import('../comment/comment.module').then( m => m.CommentPageModule)

                        },


            ],

    },
    {
        path: 'category/category-detail/:id',
        loadChildren: () => import('./category/category-detail/category-detail.module').then( m => m.CategoryDetailPageModule)

    },
    {
        path: 'cours/cours-detail/:idResource/:idCours',
        loadChildren: () => import('./cours/cours-detail/cours-detail.module').then( m => m.CoursDetailPageModule)


    }

 /* {
       path: '',
       redirectTo: 'home/resource/category',
       pathMatch: 'full'
     } ,
     {
            path: 'home/resource/category',
            component: CategoryPage,
            children: [

     ]

    },
         { path: 'home/resource/cours',
            component: CoursPage,
        },

    { path: 'home/resource/category/category-detail/:id',
       component: CategoryDetailPage,
   },
  {
    path: 'cours',
    loadChildren: () => import('./cours/cours.module').then( m => m.CoursPageModule)
  }
*/
   /* ,
     {
        path: 'category',
        loadChildren: () => import('./category/category.module').then(m => m.CategoryPageModule) ,

      } */

   /* children:[
                 { path: 'category',
                  loadChildren: () => import('./category/category.module').then(m => m.CategoryPageModule) ,

                  }

             ]
  },
  { path: '', redirectTo: 'resource/category', pathMatch: 'full' }, */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourcePageRoutingModule {}
