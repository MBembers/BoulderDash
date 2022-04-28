import { IBoulder } from "./types";

export default class Boulder implements IBoulder {
  color: string;
  constructor() {
    this.color = "brown";
  }
}
