import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-request-course',
  templateUrl: './request-course.component.html',
  styleUrls: ['./request-course.component.scss'],
})
export class RequestCourseComponent implements OnInit {
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit(): void {}
  courseUrl!: string;
  id!: string;

  onSubmit(f: NgForm) {
    this.courseUrl = f.value;
    this.courseUrl = JSON.stringify(this.courseUrl);
    // console.log(this.courseUrl);

    console.log(f.valid);
    this.courseUrl = this.courseUrl.trim();
    if (
      this.courseUrl.includes('youtube.com') ||
      this.courseUrl.includes('youtu.be')
    ) {
      if (this.courseUrl.includes('playlist?list=')) {
        this.id = String(
          this.courseUrl.match(/(?<=playlist\?list=)(.*?)(?=(?:\?|$))/)![0]
        );
        this.getPlaylist(this.id);
      }
    } else {
      this.toastr.error('As of now we only support YouTube Playlists.');
    }
  }

  getPlaylist(id: string) {
    let res = this.http.get(
      `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=${id}f&key=${environment.googleAPI_KEY}`
    );
    console.log(`Heyyy. ${res}`);
  }
}
