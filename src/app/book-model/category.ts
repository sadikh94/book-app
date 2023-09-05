export class Category {
  id: number;
  genre: string;
  icon: string;

  constructor(id: number, genre: string, icon: string) {
    this.id = id;
    this.genre = genre;
    this.icon = icon;
  }
}
