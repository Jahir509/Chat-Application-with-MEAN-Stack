import {AbstractControl} from "@angular/forms";
import {observable, Observable, Observer} from "rxjs";

export const mimeTypeValidator = (control:AbstractControl): Promise<{[key:string]:any}> | Observable<{[key:string]:any}> =>{
   const file = control.value as File;
   const fileReader = new FileReader();
   const frObservable = Observable.create((observer: Observer<{[key:string]:any}>) => {
      fileReader.addEventListener("loadend", () => {
        // Validation Goes here
        const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0,4);
        let header = "";
        let isValid = false;
        for(let i = 0; i < arr.length; i++){
          header += arr[i].toString(16);
        }
        /**
         * Checking File Type in Switch Case
         **/
        switch (header){
          case "89504e47":          // Png File Type Signature
          case "0d0a1a0a":          // Png File Type Signature
            isValid = true;
            break;
          case "ffd8ffe0":          // JPE,JPEG,JPG,JFIF File Type Signature
          case "ffd8ffe1":          // Digital Camera JPEG File Type Signature
          case "ffd8ffe2":          // Canon JPEG File Type Signature
          case "ffd8ffe3":          // Samsung JPEG File Type Signature
          case "ffd8ffe8":          // JPG File Type Signature
            isValid = true;
            break;
          default:
            isValid = false; // Or you can use the blob.type as fallback
            break;
        }

        if(isValid){
          observer.next(null)
        }else{
          observer.next({invalidMimeType:true})
        }
        observer.complete();
      });
      fileReader.readAsArrayBuffer(file);
   });
   return frObservable;
};
