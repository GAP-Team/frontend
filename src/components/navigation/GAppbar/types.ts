export interface Notification {
  message: string;
  time: string;
  status: "success" | "warning" | "danger";
}
