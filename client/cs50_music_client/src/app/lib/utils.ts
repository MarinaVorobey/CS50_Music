export function formatTimePassed(time: Date): string {
  const passed: number = Date.now() - time.getTime();
  if (passed / 31556952000 >= 1) {
    const d = new Date(time);
    const day = `${d.getDate()}`;
    const month = `${d.getMonth() + 1}`;

    return `${day.length > 1 ? day : "0" + day}.${
      month.length > 1 ? month : "0" + month
    }.${d.getFullYear()}`;
  }

  return passed / 2629746000 >= 1
    ? `${Math.floor(passed / 2629746000)} month ago`
    : passed / 86400000 >= 1
    ? `${Math.floor(passed / 86400000)} days ago`
    : passed / 3600000 >= 1
    ? `${Math.floor(passed / 3600000)} hours ago`
    : passed / 60000 >= 1
    ? `${Math.floor(passed / 60000)} minutes ago`
    : "less than a minute ago";
}

export function formatDuration(time: number): string {
  const minutes = Math.floor(time / 60000);
  time = time % 60000;
  const seconds = `${Math.floor(time / 1000)}`;
  return `${minutes}:${seconds.length > 1 ? seconds : "0" + seconds}`;
}

export function moveSearchbar(): void {
  const search = document.getElementById("search");
  search?.classList.toggle("search--active");
}
