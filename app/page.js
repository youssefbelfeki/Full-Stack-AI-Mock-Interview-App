'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter()
  return (
    <div >
      <h1>hello</h1>
      <Button onClick={()=>router.push('/dashboard')}>Click Me</Button>
    </div>
  );
}
