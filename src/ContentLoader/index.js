import { calculateNewValue } from "@testing-library/user-event/dist/utils";
import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={800}
    height={90}
    viewBox="0 0 476 50"
    backgroundColor="#218a8e"
    foregroundColor="#a7fcff"
    {...props}
  >
    <rect x="3" y="0" rx="5" ry="5" width="400" height="150" />

  </ContentLoader>
)

export { MyLoader };