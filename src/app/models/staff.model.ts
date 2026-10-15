/* =====================================================================
   FILE: src/app/models/staff.model.ts
   WHAT: Describes the structure of one staff member.
   WHY:  Ensures the staff service uses the correct fields.
   ===================================================================== */

export interface StaffMember {
  id: number;
  name: string;
  department: string;
  role: string;
  bio: string;
  quote: string;
  photo: string;
  featured: boolean;
}