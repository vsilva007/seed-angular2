import {
  Component, NgZone, Inject, EventEmitter, ViewEncapsulation, Output, ViewChild, ElementRef, Input, OnChanges
} from '@angular/core';
import { NgUploaderOptions, UploadedFile} from 'ngx-uploader';
import {AuthorizationService} from "../../../core/services/authorization.service";
import {ModalDirective} from "ng2-bootstrap";


@Component({
  selector: 'upload-image',
  templateUrl: 'upload-image.component.html',
  styleUrls: ['upload-image.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class UploadImage implements OnChanges{
  @Input() imgType: string = 'profile';
  @Input() set urlImg(urlImg: string){
    if(urlImg != '' && urlImg && !urlImg.startsWith('tmpFile')) {
      if ((urlImg.startsWith('http://') || urlImg.startsWith('https://'))) {
        this.originalImg = urlImg;
      }
      else{
        this.originalImg = '/api/assets/' + urlImg;
      }
    }
  };

  private originalImg: string = 'assets/img/default-thumbnail.jpg';
  @Output() onFinish: EventEmitter<any> = new EventEmitter();
  @ViewChild('uploadImageModal') public childModal:ModalDirective;


  public options: NgUploaderOptions;
  public response: any;
  public progress: number;
  public sizeLimit: number = 5000000;
  public previewData: any;
  public errorMessage: string;
  public inputUploadEvents: EventEmitter<string>;
  public hasBaseDropZoneOver: boolean = false;
  public newImageSelected : boolean = false;


  constructor(private el: ElementRef, @Inject(NgZone) private zone: NgZone, public authorizationService: AuthorizationService) {
    this.options = new NgUploaderOptions({
      url: '/api/assets',
      filterExtensions: true,
      allowedExtensions: ['jpg', 'png'],
      autoUpload: false,
      fieldName: 'file',
      fieldReset: true,
      maxUploads: 1,
      method: 'POST',
      previewUrl: true,
      customHeaders: {'auth-token': this.authorizationService.getCurrentToken()},
      withCredentials: false
    });

    this.inputUploadEvents = new EventEmitter<string>();
    this.previewData = "assets/img/default-thumbnail.jpg";
  }

  public startUpload() {
    this.inputUploadEvents.emit('startUpload');
  }

  public beforeUpload(uploadingFile: UploadedFile): void {
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      this.newImageSelected = false;
      this.errorMessage = 'File is too large!';
    }
  }

  public handleUpload(data: any) {
    this.zone.run(() => {
      this.response = data;
      this.progress = data.progress.percent; //no need to divide by 100 anymore!
      console.log(this.progress);
      this.newImageSelected = false;
      if(data && data.response){
        setTimeout(() => {
          this.initInfo();
          this.hideChildModal();
          this.originalImg =this.previewData;
          this.onFinish.emit(data.response);
        }, 100);
      }
    });
  }

  public handlePreviewData(data: any) {
    this.initInfo();
    this.newImageSelected = true;
    this.previewData = data;
  }

  fileOverBase(e:any):void {
    this.initInfo();
    this.hasBaseDropZoneOver = e;
  }

  private initInfo(){
    this.response = {};
    this.progress = null;
  }

  public showChildModal():void {
    this.childModal.show();
  }

  public hideChildModal():void {
    this.childModal.hide();
  }

  ngOnChanges(){

  }
}
