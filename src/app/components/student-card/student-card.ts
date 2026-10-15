/* =====================================================================
   FILE: src/app/components/student-card/student-card.ts
   WHAT: Controls the data received by the student card.
   WHY: Passes student information into the card and handles photo errors.
   ===================================================================== */

import { Component, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-card',
  imports: [RouterLink],
  templateUrl: './student-card.html',
  styleUrl: './student-card.css',
})
export class StudentCard {
  readonly student = input.required<Student>();

  // Remembers whether the student's photo failed to load.
  private readonly imageFailed = signal(false);

  // Uses the placeholder when the original photo fails.
  protected readonly photoSrc = computed(() =>
    this.imageFailed()
      ? 'images/placeholder-portrait.svg'
      : this.student().photo,
  );

  // Switches to the placeholder when the photo cannot load.
  protected onImageError(): void {
    this.imageFailed.set(true);
  }
}