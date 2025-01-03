import { Agent } from "https";

export const AGENT_CONFIG = {
  httpsAgent: new Agent({
    rejectUnauthorized: process.env.NODE_ENV === "development" ? false : true,
  }),
};
