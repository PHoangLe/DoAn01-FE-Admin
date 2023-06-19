import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { finalize } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
  ) { }

  avatarUrl: string;
  async pushFileToStorage(fileUpload: File): Promise<any> {
    let basePath = '/Fund';
    let filePath = `${basePath}/${fileUpload.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload);

    const promise = new Promise<void>((resolve, reject) => {
      uploadTask.snapshotChanges().pipe(
        finalize(async () => {
          await storageRef.getDownloadURL().subscribe(downloadURL => {
            this.avatarUrl = (downloadURL)
            this.db.list(basePath).push(fileUpload);
            resolve();
          });
        })
      ).subscribe()
    });
    return promise
  }

  public getAvatarUrl(): string {
    return this.avatarUrl
  }

}
