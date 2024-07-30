import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { IPlaylistMany } from "./definitions";

export function formatTimePassed(time: string): string {
  const passed: number = Date.now() - new Date(time).getTime();
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

export function formatDuration(time: string): string {
  const timeSplit = time.split(":");
  const timeArr = timeSplit.slice(0, 2).map((n) => +n);
  const seconds = +timeSplit[2].slice(0, 2);
  if (timeArr[0] > 0) {
    timeArr[1] += timeArr[0] * 60;
  }
  return `${timeArr[1]}:${seconds < 9 ? `0${seconds}` : `${seconds}`}`;
}

export function formatDurationFromNumber(time: number) {
  const passed = new Date(time * 1000);
  return `${passed.getMinutes()}:${
    passed.getSeconds() < 10 ? "0" : ""
  }${passed.getSeconds()}`;
}

export function moveSearchbar(): void {
  const search = document.getElementById("search");
  search?.classList.toggle("search__inactive");
}

export function useSearchTracks(): boolean {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [searched, setSearched] = useState(false);
  const client = useQueryClient();

  useEffect(() => {
    setSearched(query !== null);
    client.invalidateQueries({ queryKey: ["search"] });
  }, [query, client]);

  return searched;
}

export function useSearchPlaylists(data?: IPlaylistMany[]) {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [dataFiltered, setDataFiltered] = useState(data);
  useEffect(() => {
    if (data) {
      if (query) {
        setDataFiltered(
          data.filter((p) => p.name.match(new RegExp(query, "gi")))
        );
      } else {
        setDataFiltered(data);
      }
    }
  }, [data, query]);

  return dataFiltered;
}

export function useCheckMounted(): boolean {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
}
