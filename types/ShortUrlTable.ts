import { BaseUrl } from "./BaseUrl";

export interface ShortUrlTable extends BaseUrl {
  status: "Active" | "Expired";
}
