import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   title = 'dictionary-web';
// }

@Component({
  selector: 'app-root',   // 👈 must match index.html
  standalone: true,
  imports: [RouterOutlet],  // if using standalone setup with routes
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent { }
