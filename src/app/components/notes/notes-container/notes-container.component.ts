import { Component, OnInit } from '@angular/core';
import { Note } from '../../../Models/Notes.model';
import { NoteService } from '../notes.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notes-container',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './notes-container.component.html',
  styleUrl: './notes-container.component.css'
})
export class NotesContainerComponent implements OnInit {
  notes: Note[] = [];
  noteForm!: FormGroup;

  constructor(private fb: FormBuilder, private noteService: NoteService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadNotes();
  }

  initializeForm() {
    this.noteForm = this.fb.group({
      title: '',
      content: ''
    });
  }

  loadNotes() {
    this.noteService.getNotes().subscribe(notes => {
      this.notes = notes;
    });
  }

  createNote() {
    const formData = this.noteForm.value;
    const newNote: Note = {
      title: formData.title,
      content: formData.content,
      createdAt: new Date().toISOString()
    };

    this.noteService.createNote(newNote).subscribe(() => {
      this.loadNotes(); // Refresh notes after creating a new one
      this.noteForm.reset(); // Reset form after creating a new note
    });
  }
}