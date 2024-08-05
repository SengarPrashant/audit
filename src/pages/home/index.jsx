import { Stack } from "rsuite"
import AppTree from "../../components/app-tree"
import TwoColumn from "../../components/page-layout/twoColumn"
import { useState } from "react"


function Home() {

  const [expanded, setExpended] = useState(true);

  return (
    <>
      <TwoColumn onToggle={setExpended}>
        <>
          <AppTree hidden={!expanded} />
          {!expanded && <h5>col</h5>}
        </>
        <h3>Content</h3>
      </TwoColumn>
    </>
  )
}

export default Home
