import React from "react"
import ContentLoader from "react-content-loader"



const Skeleton: React.FC = () => (
  <div className="pizza__block__wraper">
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={491}
      viewBox="0 0 280 491"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="140" cy="120" r="120" />
      <rect x="15" y="270" rx="15" ry="15" width="250" height="30" />
      <rect x="0" y="330" rx="10" ry="10" width="280" height="88" />
      <rect x="0" y="430" rx="10" ry="10" width="100" height="45" />
      <rect x="130" y="430" rx="10" ry="10" width="150" height="45" />
    </ContentLoader>
  </div>
)

export default Skeleton;

