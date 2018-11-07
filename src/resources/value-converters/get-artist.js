export class GetAristValueConverter {
  toView(artist) {
    if (artist) {
      console.log(artist.ArtistName)
      return artist.ArtistName;
    }
  }
}