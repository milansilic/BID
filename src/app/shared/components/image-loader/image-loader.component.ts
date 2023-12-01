import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from '../../../services/file-upload.service';

@Component({
  selector: 'image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.scss']
})
export class ImageLoaderComponent implements OnInit {
  selectedFiles: FileList;
  previews: string[] = [];
  imageInfos?: Observable<any>;

  @Output() uploadedFile = new EventEmitter();

  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {
    this.imageInfos = this.uploadService.getFiles();
  }

  selectFiles(event: any): void {
    this.selectedFiles = event.target.files;
    var mimeType = this.selectedFiles[0].type;

    if (mimeType.match(/image\/*/) === null) return;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);

        this.uploadedFile.next(this.selectedFiles);
      }
    }
  }
}