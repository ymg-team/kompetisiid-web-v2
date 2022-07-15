// ref: https://codepen.io/dimsemenov/pen/yyBWoR

import React from "react"
import GlobalLoaderStyled from "./styled"

export default ({ style = {} }) => {
  return (
    <GlobalLoaderStyled {...{ style }}>
      <div className="pswp__preloader__icn">
        <div className="pswp__preloader__cut">
          <div className="pswp__preloader__donut" />
        </div>
      </div>
    </GlobalLoaderStyled>
  )
}
