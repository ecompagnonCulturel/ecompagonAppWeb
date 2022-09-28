import {Component, Inject, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticService  } from '../../authentification/authentic.service';
import { CommentService } from './comment.service';
import {LoadingController, ModalController} from '@ionic/angular';
import { SessionService } from '../session/session.service';
import { AlertController } from '@ionic/angular';
import * as _ from 'lodash';
import 'moment/locale/pt-br';
import * as moment from 'moment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {
  commentForm: FormGroup;
  currentUser: any;
  currentSession: any;
  constructor(private commentService: CommentService,
              private readonly httpClient: HttpClient,
              private modalController: ModalController,
              // private socialSharing:SocialSharing
              private authenticService: AuthenticService,
              private router: Router,
              private route: ActivatedRoute,
              private loadingController: LoadingController,
              private sessionService: SessionService,
              public alertController: AlertController,
              @Inject(MAT_DIALOG_DATA) public data,
              private fb: FormBuilder,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.getCurrentUser();
    this.getCurrentSession();

    this.commentForm = this.fb.group({
          id: 0,
          commentUser: [''],
          commentRessource: [''],
          commentDate: [''],
          commentDesc: ['', [Validators.required, Validators.maxLength(1499)]],
          commentStatut: 1,
        },
    );


    if (this.data.comment !== undefined){
      this.commentForm.patchValue(
          {  id: this.data.comment.id,
            commentUser: this.data.comment.commentUser.idUsers,
            commentRessource: this.data.comment.commentResource.id,
            commentDate: this.data.comment.commentDate,
            commentDesc: this.data.comment.commentDesc,
            commentStatut: this.data.comment.commentStatut

          } );
    }
  }

  submit() {
  //  console.log(this.currentUser);
    this.commentForm.get('commentDate').setValue(moment().format());
    this.commentForm.get('commentUser').setValue(this.currentUser.idUsers);
    this.commentForm.get('commentStatut').setValue(1);
    // console.log(this.noteForm.get('noteResource').value);
    if (this.commentForm.get('commentRessource').value === '')
    {
      this.commentForm.get('commentRessource').setValue(this.data.ressource);
    }
    else {
      this.commentForm.get('commentRessource').setValue(this.data.comment.commentResource.id);
    }
    this.commentService.addComment(this.commentForm.value)
        .subscribe(not => {
              this.closeDialog();
            },
            err => {
              // console.log(err);

            });
  }

  closeDialog() {
    try {
      this.dialog.closeAll(); // make sure it only closes if the upper async fn succesfully ran!
    } catch (e) {
      console.log(e.response.message);
    }
  }

    get commentDesc()
    {
        return this.commentForm.get('commentDesc');
    }
  async deleteComment(idcomment: any) {
    this.commentService.deleteComment(idcomment)
        .subscribe(comm => {
              console.log(comm.id);

            },
            err => {
              console.log(err);

            }) ;
  }

    getCurrentUser() {
        this.authenticService.loadToken();
        const User = (this.authenticService.currentUser).asObservable();
        User.subscribe(user => {
            // console.log(user);
            if (user != null) {
                this.currentUser = user;
            }

        });
    }

  async  getCurrentSession()
  {

    const Session = (this.sessionService.Currentsession).asObservable();
    // console.log(Session);
    Session.subscribe(session => {
     // console.log(session);
      if (session)
      {
        this.currentSession = session;

      }


    });

  }
}
