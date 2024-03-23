import { Routes } from '@angular/router';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { TimeLineComponent } from './time-line/time-line.component';

export const routes: Routes = [
  { path: '', component: ImageUploadComponent },
  { path: 'timeline', component: TimeLineComponent },
];
