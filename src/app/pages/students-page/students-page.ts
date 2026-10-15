/* =====================================================================
   FILE: src/app/pages/students-page/students-page.ts
   WHAT: The landing page: title, filters and the grid of student cards.
   FIGMA: Frame "Class of 2028 · Student directory".

   WHAT STUDENTS PRACTISE HERE
   1. Fetching data from a service (the fake API)
   2. Loading / error / empty states
   3. Filtering + sorting with signals and computed
   4. Using the StudentCard component
   ===================================================================== */

import { Component, OnInit, computed, inject, signal } from '@angular/core';

import { Student } from '../../models/student.model';
import { StudentCard } from '../../components/student-card/student-card';
import { StudentService } from '../../services/student.service';

// A type for the sort dropdown. Only these two values are allowed.
type SortMode = 'featured' | 'name';

@Component({
  selector: 'app-student-page',
  imports: [StudentCard],
  templateUrl: './students-page.html',
  styleUrl: './students-page.css',
})
export class StudentsPage implements OnInit {
  // Ask Angular for the service.
  // This component never accesses JSON files or URLs directly.
  private readonly studentService = inject(StudentService);

  // STATE: data that can change while the page is open.
  // Signals automatically update places in the template that read them.
  protected readonly students = signal<Student[]>([]);
  protected readonly loading = signal(true);
  protected readonly errorMessage = signal('');
  protected readonly searchText = signal('');
  protected readonly selectedFaculty = signal('all');
  protected readonly sortBy = signal<SortMode>('featured');

  // DERIVED STATE: the list of faculties for the dropdown.
  protected readonly faculties = computed(() =>
    [...new Set(this.students().map((s) => s.faculty))].sort(),
  );

  // Filter and sort the students displayed on the page.
  protected readonly visibleStudents = computed(() => {
    const text = this.searchText().trim().toLowerCase();
    const faculty = this.selectedFaculty();

    const filtered = this.students().filter(
      (s) =>
        s.name.toLowerCase().includes(text) &&
        (faculty === 'all' || s.faculty === faculty),
    );

    return this.sortBy() === 'name'
      ? filtered.sort((a, b) => a.name.localeCompare(b.name))
      : filtered.sort(
          (a, b) => Number(b.featured) - Number(a.featured) || a.id - b.id,
        );
  });

  // Two-digit counter used by the design.
  protected readonly totalLabel = computed(() =>
    String(this.students().length).padStart(2, '0'),
  );

  // Load students when Angular initializes the page.
  ngOnInit(): void {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set(
          'We could not load the students. Please try again.',
        );
        this.loading.set(false);
      },
    });
  }

  // Update the search text when the user types.
  protected onSearch(event: Event): void {
    this.searchText.set((event.target as HTMLInputElement).value);
  }

  // Update the selected faculty.
  protected onFacultyChange(event: Event): void {
    this.selectedFaculty.set((event.target as HTMLSelectElement).value);
  }

  // Update the sorting mode.
  protected onSortChange(event: Event): void {
    this.sortBy.set(
      (event.target as HTMLSelectElement).value as SortMode,
    );
  }

  // Smoothly scroll back to the top.
  protected scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}