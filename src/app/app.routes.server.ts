/* =====================================================================
   FILE: src/app/app.routes.server.ts
   WHAT: Defines how Angular renders routes on the server.
   WHY: Avoids prerendering dynamic student routes without parameters.
   ===================================================================== */

import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'students/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];