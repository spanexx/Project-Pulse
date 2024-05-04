import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { Task, TaskStatus } from '../Models/Task';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Reminder } from '../Models/Reminder.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private firestore: AngularFirestore) {}

  createTask(task: Task): Observable<Task> {
    task.created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
    return from(this.firestore.collection('tasks').add(task)).pipe(
      map((action) => {
        const id = action.id;
        return { ...task, id };
      })
    );
  }

  getTasks() {
    return this.firestore
      .collection('tasks')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Task;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  getTasksByStatus(status: string): Observable<{ id: string; data: Task }[]> {
    return this.firestore
      .collection('tasks', (ref) => ref.where('status', '==', status))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Task;
            const id = a.payload.doc.id;
            return { id, data };
          })
        )
      );
  }

  deleteTask(taskId: string): Observable<void> {
    return from(this.firestore.collection('tasks').doc(taskId).delete());
  }

  updateTask(taskId: string, task: Task): Observable<void> {
    task.updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
    return from(this.firestore.collection('tasks').doc(taskId).update(task));
  }

  getTask(taskId: string): Observable<Task | undefined> {
    return this.firestore
      .collection('tasks')
      .doc(taskId)
      .get()
      .pipe(
        map((taskSnapshot) =>
          taskSnapshot.exists ? (taskSnapshot.data() as Task) : undefined
        )
      );
  }


  createReminder(reminder: Reminder): Observable<Reminder> {
    return from(this.firestore.collection('reminders').add(reminder)).pipe(
      map((action) => {
        const id = action.id;
        return { ...reminder, id };
      })
    );
  }
}
