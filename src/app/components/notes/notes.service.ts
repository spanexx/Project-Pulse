import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Note } from '../../Models/Notes.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notesCollection: AngularFirestoreCollection<Note>;

  constructor(private firestore: AngularFirestore) {
    this.notesCollection = this.firestore.collection<Note>('notes');
  }

  createNote(note: Note): Observable<Note> {
    note.createdAt = new Date().toISOString();
    return from(this.notesCollection.add(note)).pipe(
      map((ref) => {
        return { ...note, id: ref.id };
      })
    );
  }

  getNotes(): Observable<Note[]> {
    return this.notesCollection.snapshotChanges().pipe(
      map((actions: DocumentChangeAction<Note>[]) => {
        return actions.map(action => {
          const data = action.payload.doc.data();
          const id = action.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  deleteNote(noteId: string): Observable<void> {
    return from(this.notesCollection.doc(noteId).delete());
  }

  updateNote(noteId: string, note: Note): Observable<void> {
    return from(this.notesCollection.doc(noteId).update(note));
  }
}
