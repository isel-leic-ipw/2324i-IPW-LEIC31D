


export function getHome(req, rsp) {
  rsp.sendFile('./public/index.html', {root: './web/site/'})
}

export function getImage(req, rsp) {
  rsp.sendFile('./public/slb-logo.svg', {root: './web/site/'})
}
