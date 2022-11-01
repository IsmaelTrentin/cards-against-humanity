interface Card {
  _id: string;
  text: string;
  isBlack: boolean;
}

export interface WhiteCard extends Card {}

export interface BlackCard extends Card {
  blanks: number[];
}

export interface AbstractCard extends WhiteCard, BlackCard {}
