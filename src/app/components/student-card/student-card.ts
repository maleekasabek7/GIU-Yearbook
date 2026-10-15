/* =====================================================================
   FILE: src/app/components/student-card/student-card.ts
   WHAT: Controls the data received by the student card.
   WHY: Passes student information into the card and handles photo errors.
   ===================================================================== */

import { Component, input } from '@angular/core';
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

  // Hide a photo only if its image fails to load.
  protected onPhotoError(event: Event): void {
    const image = event.target as HTMLImageElement;
    image.onerror = null;
    image.style.visibility = 'hidden';
  }
}