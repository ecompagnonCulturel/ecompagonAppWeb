import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticService} from '@app/authentification/authentic.service';
import {NoteService} from '@app/formation/note/note.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import moment from 'moment';
import {UtileService} from '@app/_helpers/utile/utile.service';
import {UtilService} from '@app/util/util.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  noteForm: FormGroup;
  currentUser: any;
  constructor(private fb: FormBuilder,
              private authenticService: AuthenticService,
              @Inject(MAT_DIALOG_DATA) public data,
              private noteService: NoteService,
              private dialog: MatDialog,
              private utilService: UtilService) { }

  ngOnInit() {
      this.getCurrentUser();
      this.noteForm = this.fb.group({
          id: 0,
          noteUser: [''],
          noteResource: [''],
          noteDate: [''],
          noteDesc: ['', [Validators.required, Validators.maxLength(1499)]],
          noteStatus: 1,
        },
    );


      if (this.data.note !== undefined){
      this.noteForm.patchValue(
          {  id: this.data.note.id,
            noteUser: this.data.note.noteUser,
            noteResource: this.data.note.noteResource.id,
            noteDate: this.data.note.noteDate,
            noteDesc: this.data.note.noteDesc,
            noteStatus: this.data.note.noteStatus,

          } );
    }

  }

    show()
    {
        console.log(this.noteForm.controls);
        console.log(this.noteForm.get('noteDesc').errors);
    }

  submit() {
    //  console.log(this.data);
    this.noteForm.get('noteDate').setValue(moment().format());
    this.noteForm.get('noteUser').setValue(this.currentUser.idUsers);
   // console.log(this.noteForm.get('noteResource').value);
    if (this.noteForm.get('noteResource').value === '')
    {
        this.noteForm.get('noteResource').setValue(this.data.ressource);
    }
    else {
        this.noteForm.get('noteResource').setValue(this.data.note.noteResource.id);
    }
    this.noteService.addNote(this.noteForm.value)
        .subscribe(not => {
            this.closeDialog();
            },
            err => {
              // console.log(err);

            });
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
   get noteDesc()
  {
    return this.noteForm.get('noteDesc');
  }

     closeDialog() {
        try {
            this.dialog.closeAll(); // make sure it only closes if the upper async fn succesfully ran!
        } catch (e) {
           console.log(e.response.message);
        }
    }

}
