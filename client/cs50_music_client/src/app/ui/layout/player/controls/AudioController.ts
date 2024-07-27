export class AudioController {
  public context: AudioContext;
  public source: MediaElementAudioSourceNode;
  public gainNode: GainNode;
  public audio: HTMLAudioElement;

  constructor(audioElement: HTMLAudioElement) {
    this.context = new AudioContext();
    this.source = this.context.createMediaElementSource(audioElement);
    this.gainNode = this.context.createGain();
    this.source.connect(this.gainNode).connect(this.context.destination);
    this.audio = audioElement;
  }

  public get elapsedTime() {
    return this.audio.currentTime;
  }

  public set elapsedTime(value: number) {
    this.audio.currentTime = value;
  }

  public changeVolume(value: string) {
    this.gainNode.gain.value = +value;
  }

  public changeProgress(value: string) {
    this.audio.currentTime = +value;
  }
}
