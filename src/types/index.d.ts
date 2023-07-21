const PLAYBACK_PLAYING = 1;
const PLAYBACK_PAUSED = 2;
const PLAYBACK_STOPPED = 3;

interface Date {
  format(fmt: string): string
}

interface Window {
  wallpaperRegisterAudioListener(callback: (data: number[]) => void): void
  wallpaperRegisterMediaStatusListener(callback: (data: boolean) => void): void
  wallpaperRegisterMediaPropertiesListener(callback: (data: WallpaperEngineMediaProperties) => void): void
  wallpaperRegisterMediaThumbnailListener(callback: (data: WallpaperEngineMediaThumbnail) => void): void
  wallpaperRegisterMediaPlaybackListener(callback: (data: WallpaperEngineMediaPlayback) => void): void
  wallpaperRegisterMediaTimelineListener(callback: (data: WallpaperEngineMediaTimeline) => void): void
}

interface WallpaperEngineMediaProperties {
  albumArtist: string,
  albumTitle: string,
  artist: string,
  contentType: string,
  genres: string,
  subTitle: string,
  title: string,
}

interface WallpaperEngineMediaThumbnail {
  thumbnail: string,
  primaryColor: string,
  secondaryColor: string,
  tertiaryColor: string,
  textColor: string,
  highContrastColor: string,
}

interface WallpaperEngineMediaPlayback {
  state: PLAYBACK_PLAYING | PLAYBACK_PAUSED | PLAYBACK_STOPPED,
}

interface WallpaperEngineMediaTimeline {
  duraton: number,
  position: number
}
