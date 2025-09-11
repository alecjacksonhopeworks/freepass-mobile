import { useRouter } from "expo-router";
import 'expo-router/entry';


export default function Index() {
  let router = useRouter();
  console.log("RenderingIndex");
  router.replace("/login");
}
