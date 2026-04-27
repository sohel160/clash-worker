export default {
  async fetch(request) {

    const url = new URL(request.url)

    if (url.searchParams.get("token") !== "abc123") {
      return new Response("Forbidden", { status: 403 })
    }

    const ua = request.headers.get("User-Agent") || ""

    const allowedUA = [
      "Clash",
      "clash",
      "ClashMeta",
      "ClashforWindows",
      "ClashX",
      "Stash",
      "FiClash"
    ]

    let allowed = false

    for (const a of allowedUA) {
      if (ua.includes(a)) {
        allowed = true
        break
      }
    }

    if (!allowed) {
      return new Response("404 Not Found", { status: 404 })
    }

    const proxies = `
proxies:

- name: free1
  type: socks5
  server: 121.200.62.73
  port: 64182
- name: free2
  type: socks5
  server: 121.200.62.253
  port: 64182
- name: free3
  type: socks5
  server: 121.200.62.242
  port: 64182
- name: free4
  type: socks5
  server: 121.200.62.237
  port: 64182
- name: free5
  type: socks5
  server: 121.200.62.81
  port: 64182
- name: free6
  type: socks5
  server: 121.200.62.142
  port: 64182
  

`

    return new Response(proxies, {
      headers: {
        "Content-Type": "text/plain"
      }
    })

  }
}
