import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  constructor(private http: HttpClient) {}
  itemsResponse: any;
  playlistRespose: any;

  getPlaylistItems(id: string): Observable<any> {
    this.itemsResponse = this.http.get<any>(
      `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=${id.slice(
        0,
        -2
      )}&key=${environment.googleAPI_KEY}`
    );
    this.playlistRespose = this.http.get<any>(
      `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id=${id.slice(
        0,
        -2
      )}&key=${environment.googleAPI_KEY}`
    );
    let courseItems = this.itemsResponse.items.map((item: any) => {
      return {
        moduleTitle: item.snippet.title,
        moduleDescription: item.snippet.description,
        moduleImage: item.snippet.thumbnails.maxres,
        modulePosition: item.snippet.position,
        videoLink: `https://www.youtube.com/watch?v=${item.contentDetails.videoId}`,
      };
    });
    let playlistDetails = this.playlistRespose.items.map((playlist:any) => {
      return {
        courseName: playlist.snippet.title,
        courseDescription: playlist.snippet.description,
        authorName: playlist.snippet.channelTitle,
        courseThumbnail: playlist.snippet.thumbnails.maxres,
      };
    });
    let playlistDetail = playlistDetails[0];
    var data = { playlistDetail, ...courseItems };

    return data;
  }
}
