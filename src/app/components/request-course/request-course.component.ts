import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { YoutubeService } from 'src/app/services/youtube.service';
import { FirestoredbService } from 'src/app/services/firestoredb.service';
import { AuthService } from 'src/app/services/auth.service';

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
    private auth: AuthService
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

        this.youtube.getPlaylistItems(this.id).subscribe((playlist) => {
          this.playlistItems = playlist.items.map((item: any) => {
            if (item.snippet.title === 'Private video') return null;
            return {
              moduleTitle: item.snippet.title,
              moduleDescription: item.snippet.description,
              moduleImage:
                item.snippet.thumbnails.maxres || item.snippet.thumbnails.high,
              modulePosition: item.snippet.position,
              videoLink: `https://www.youtube.com/watch?v=${item.contentDetails.videoId}`,
            };
          });
          console.log(this.playlistItems);
          this.playlistItems = { items: [...this.playlistItems] };
          console.log(this.playlistItems);
          this.fire.addYoutubeCourse(this.id, this.playlistItems);
        });
        this.youtube.getPlaylistDetails(this.id).subscribe((playlistDetail) => {
          this.playlistDetails = playlistDetail.items.map((playlist: any) => {
            return {
              courseName: playlist.snippet.title,
              courseDescription: playlist.snippet.description,
              authorName: playlist.snippet.channelTitle,
              courseThumbnail: playlist.snippet.thumbnails.maxres,
            };
          });
          this.playlistDetails = this.playlistDetails[0];
          this.fire.addYoutubeCourse(this.id, this.playlistDetails);
        });
        this.toastr.success('Added!');
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
