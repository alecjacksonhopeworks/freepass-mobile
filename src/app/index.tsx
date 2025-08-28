// SamplePage.tsx

import { useRouter } from "expo-router";

export default function Index() {
  let router = useRouter();

  router.replace("/login");
}

