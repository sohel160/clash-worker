export default {
  async fetch(request) {

    const url = new URL(request.url)
    const token = url.searchParams.get("token")

    // token protection
    if (token !== "abc123") {
      return new Response("Forbidden", { status: 403 })
    }

    // detect client
    const ua = request.headers.get("User-Agent") || ""
    const accept = request.headers.get("Accept") || ""

    // allow only Clash / FiClash clients
    const allowedClients = [
      "Clash",
      "clash",
      "ClashMeta",
      "ClashforWindows",
      "ClashX",
      "Stash",
      "Shadowrocket",
      "FiClash"
    ]

    let allowed = false

    for (const client of allowedClients) {
      if (ua.includes(client)) {
        allowed = true
        break
      }
    }

    // block browsers
    if (!allowed && accept.includes("text/html")) {
      return new Response("404 Not Found", { status: 404 })
    }

    // hidden proxy config
    const config = `
proxies:
  - name: "proxy1"
    type: socks5
    server: 45.115.113.114
    port: 64182

  - name: "proxy2"
    type: socks5
    server: 103.89.24.221
    port: 65088
    user: 1
    pass: 1
`

    return new Response(config, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    })

  }
}
