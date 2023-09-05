export class Book {
  id: number;
  title: string;
  genre: string;
  cover: string;
  description: string;
  date?: Date;
  download?: string;
  read?: string;
  buy?: string;
  favorite?: boolean;

  constructor(
    id: number,
    title: string,
    genre: string,
    cover: string,
    description: string,
    date?: Date,
    download?: string,
    read?: string,
    buy?: string,
    favorite?: boolean
  ) {
    this.id = id;
    this.title = title;
    this.genre = genre;
    this.cover = cover;
    this.description = description;
    this.date = date;
    this.download = download;
    this.read = read;
    this.buy = buy;
    this.favorite = favorite;
  }
}
