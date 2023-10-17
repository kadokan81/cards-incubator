import { Button } from "./components/ui/button";

export function App() {
  return <div style={{display:"flex", gap:"20px"}}>

<Button variant='link' as='a' href={'/link'} >Hello</Button>


<Button variant='primary' >Hello</Button>
<Button  icon={true} >Exit Icon</Button>


  </div>
}
