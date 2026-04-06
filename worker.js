export default {
 async fetch(request) {

  const url = new URL(request.url)
  const token = url.searchParams.get("token")

  // token protection
  if (token !== "abc123")
   return new Response("Forbidden",{status:403})

  // allow only Clash clients
  const ua = request.headers.get("User-Agent") || ""
  const allowed = ["Clash","clash","ClashMeta","ClashforWindows","ClashX","FiClash","Stash","Shadowrocket"]

  let ok = false
  for (const c of allowed){
   if (ua.includes(c)) ok = true
  }

  if (!ok)
   return new Response("404",{status:404})

  // full config
  const cfg = `
proxies:
- name: proxy1
  type: socks5
  server: 45.115.113.114
  port: 64182

- name: proxy2
  type: socks5
  server: 144.48.108.122
  port: 5452
  
proxy-groups:
- name: SELECT
  type: select
  proxies:
  - proxy1
  - proxy2

rules:
- MATCH,SELECT
`

  return new Response(cfg.trim(),{
   headers:{
    "content-type":"text/plain;charset=utf-8"
   }
  })

 }
}
