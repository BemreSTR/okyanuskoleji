export interface Video {
  id: string;
  title: string;
  youtubeId: string;
  kahootLink?: string;
  wordwallKitaplik?: string;
  wordwallCarkifelek?: string;
}

export interface Unit {
  id: string;
  name: string;
  videos: Video[];
}

export interface Grade {
  id: string;
  name: string;
  displayName: string;
  units: Unit[];
  isActive: boolean;
}
