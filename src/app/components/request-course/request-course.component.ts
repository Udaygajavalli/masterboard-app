import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { YoutubeService } from 'src/app/services/youtube.service';
import { FirestoredbService } from 'src/app/services/firestoredb.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-request-course',
  templateUrl: './request-course.component.html',
  styleUrls: ['./request-course.component.scss'],
})
export class RequestCourseComponent implements OnInit {
  user: any;
  constructor(
    private toastr: ToastrService,
    private youtube: YoutubeService,
    private fire: FirestoredbService,
    private auth: AuthService,
    private router: Router
  ) {
    this.auth.getUser().subscribe(
      (user) => {
        if (user) {
          this.user = user;
        } else {
          this.toastr.warning('Please sign in to access this page.');
        }
      },
      (err) => {
        this.toastr.error(err.message);
      }
    );
  }

  ngOnInit(): void {}
  courseUrl!: string;
  id!: string;
  playlistItems: any;
  playlistDetails: any;
  courseId: any;
  courseName: any;
  authorName: any;
  onSubmit(f: NgForm) {
    this.courseUrl = f.value;
    this.courseUrl = JSON.stringify(this.courseUrl);
    console.log(f.valid);
    this.courseUrl = this.courseUrl.trim();
    if (
      this.courseUrl.includes('youtube.com') ||
      this.courseUrl.includes('youtu.be')
    ) {
      if (this.courseUrl.includes('playlist?list=')) {
        let regex = /(?<=playlist\?list=)(.*?)(?=(?:\?|$))/g;
        this.id = this.courseUrl.match(regex)![0];
        this.id = this.id.slice(0, -2);
        this.youtube.getPlaylistDetails(this.id).subscribe((playlistDetail) => {
          this.playlistDetails = playlistDetail.items.map((playlist: any) => {
            this.courseId = this.id;
            this.courseName = playlist.snippet.title;
            this.authorName = playlist.snippet.channelTitle;
            return {
              courseId: this.id,
              courseName: playlist.snippet.title,
              authorName: playlist.snippet.channelTitle,
              courseDescription: playlist.snippet.description,
              courseThumbnail: playlist.snippet.thumbnails.maxres || playlist.snippet.thumbnails.high || playlist.snippet.thumbnails.default,
            };
          });
          this.playlistDetails = this.playlistDetails[0];
          this.fire.addYoutubeCourse(this.id, this.playlistDetails);
        });
        this.youtube.getPlaylistItems(this.id).subscribe((playlist) => {
          this.playlistItems = playlist.items.map((item: any) => {
            if (item.snippet.title === 'Private video') return null;
            return {
              courseId: this.courseId,
              courseName: this.courseName,
              authorName: this.authorName,
              moduleId: item.contentDetails.videoId,
              moduleTitle: item.snippet.title,
              moduleDescription: item.snippet.description,
              moduleImage:
                item.snippet.thumbnails.maxres || item.snippet.thumbnails.high || playlist.snippet.thumbnails.default,
              modulePosition: item.snippet.position,
              videoLink: `https://www.youtube.com/watch?v=${item.contentDetails.videoId}`,
            };
          });
          this.playlistItems = { items: [...this.playlistItems] };
          this.fire.addYoutubeCourse(this.id, this.playlistItems);
        });

        this.toastr.success('Added!');
        this.router.navigateByUrl('');

        f.resetForm();
      }
    } else {
      let data = {
        email: this.user.email,
        url: f.value.courseUrl,
      };
      this.fire.courseRequests(data);
      this.toastr.error('As of now we only support YouTube Playlists.');
      f.resetForm();
    }
  }
}
