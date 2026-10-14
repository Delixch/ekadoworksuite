import { redirect } from "next/navigation";

/** Eski "Blog" bağlantısı: yerine Destek sayfası geldi */
export default function Page() {
  redirect("/support");
}
