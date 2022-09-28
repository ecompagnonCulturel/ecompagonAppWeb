import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './profile/profile.component';
import {UpdateComponent} from './profile/update/update.component';
import {UpdatePasswordComponent} from './profile/updatePassword/updatePassword.component';
import {DetailComponent} from './profile/detail/detail.component';
import {AproposComponent} from './profile/apropos/apropos.component';


const routes: Routes = [
    {
        path: 'home/profile',
        component: ProfileComponent,
        children: [
            {
                path: 'details',
                component: DetailComponent
            },
            {
                path: 'update',
                component: UpdateComponent
            },
            {
                path: 'password',
                component: UpdatePasswordComponent
            },
            {
                path: 'propos',
                component: AproposComponent
            }

        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {
}
