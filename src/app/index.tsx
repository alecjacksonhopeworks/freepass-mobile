// SamplePage.tsx

import { useRouter } from "expo-router";

export default function Index() {
  let router = useRouter();
  console.log("RenderingIndex");
  router.replace("/login");
}
