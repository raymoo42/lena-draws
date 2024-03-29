import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { take } from 'rxjs';
import { ImageServiceService } from '../image-service/image-service.service';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css'
})
export class ImageUploadComponent {
  imageService = inject(ImageServiceService);

  file = signal<File | null>(null);
  filename = computed(() => {
    const f = this.file();
    if (f == null) {
      return "Upload your File here ..."
    } else {
      return f.name;
    }

  });

  placeholderImage = signal("https://dummyimage.com/400x400/000/fff&text=Here+kitty+kitty");

  constructor() {
    const f = this.file()
    if (f == null) {
      this.placeholderImage.set("https://dummyimage.com/400x400/000/fff&text=Here+kitty+kitty");
    } else {
      const r = new FileReader();
      r.readAsDataURL(f);

      r.onload = (e) => { this.placeholderImage.update(v => e?.target?.result as string) }
    }
  }


  onFileInputChange($event: Event) {
    const fileinput = $event.target as HTMLInputElement
    const fileList = fileinput.files ?? [];

    this.file.set(fileList[0])
  }

  cancel() {
    this.file.set(null);
  }

  submit() {
    const file = this.file();
    if (file != null) {
      this.imageService.uploadImage(file)
        .pipe(take(1))
        .subscribe(
          {
            next: (result: any) => { console.log(result) },
            error: (error: any) => { console.error(error) }
          }
        );
    }
  }

}
