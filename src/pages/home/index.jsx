import { Stack } from "rsuite"
import { useState } from "react"
import TableDrawer from "../../page-templates/table-drawer";


function Home() {

  const [expanded, setExpended] = useState(true);

  return (
    <>
     <h3 className="m-4">This is home page.</h3>
    </>
  )
}

export default Home
